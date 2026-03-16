import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PixelBlastProps {
  variant?: 'square' | 'circle';
  pixelSize?: number;
  color?: string;
  patternScale?: number;
  patternDensity?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleSpeed?: number;
  rippleThickness?: number;
  rippleIntensityScale?: number;
  liquid?: boolean;
  liquidStrength?: number;
  liquidRadius?: number;
  liquidWobbleSpeed?: number;
  speed?: number;
  edgeFade?: number;
  transparent?: boolean;
}

export default function PixelBlast({
  color = '#B19EEF',
  pixelSize = 4,
  speed = 0.5,
  enableRipples = true,
  rippleSpeed = 0.4,
}: PixelBlastProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    el.appendChild(renderer.domElement);

    // Parse color
    const col = new THREE.Color(color);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(el.clientWidth, el.clientHeight) },
      uPixelSize: { value: pixelSize },
      uColor: { value: new THREE.Vector3(col.r, col.g, col.b) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uSpeed: { value: speed },
      uRipple: { value: enableRipples ? 1.0 : 0.0 },
      uRippleSpeed: { value: rippleSpeed },
    };

    const vertShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragShader = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uPixelSize;
      uniform vec3 uColor;
      uniform vec2 uMouse;
      uniform float uSpeed;
      uniform float uRipple;
      uniform float uRippleSpeed;
      varying vec2 vUv;

      float hash(vec2 p) {
        p = fract(p * vec2(234.34, 435.345));
        p += dot(p, p + 34.23);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1, 0)), f.x),
          mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x),
          f.y
        );
      }

      void main() {
        vec2 fragCoord = vUv * uResolution;
        vec2 pixelCoord = floor(fragCoord / uPixelSize) * uPixelSize;
        vec2 uv = pixelCoord / uResolution;

        float t = uTime * uSpeed;

        // Multi-octave noise for depth
        float n = 0.0;
        n += noise(uv * 3.0 + t * 0.5) * 0.5;
        n += noise(uv * 6.0 - t * 0.3) * 0.25;
        n += noise(uv * 12.0 + t * 0.7) * 0.125;
        n += noise(uv * 24.0 - t * 0.4) * 0.0625;
        n = n / 0.9375;

        // Edge fade
        vec2 edge = smoothstep(0.0, 0.15, uv) * smoothstep(0.0, 0.15, 1.0 - uv);
        float edgeFade = edge.x * edge.y;

        // Ripple
        float ripple = 0.0;
        if (uRipple > 0.5) {
          vec2 mousePos = uMouse;
          float dist = length(uv - mousePos);
          ripple = sin(dist * 20.0 - uTime * uRippleSpeed * 10.0) * 0.5 + 0.5;
          ripple *= exp(-dist * 5.0) * 0.4;
          ripple *= smoothstep(0.8, 0.0, dist);
        }

        float finalNoise = clamp(n + ripple, 0.0, 1.0);

        // Pixel threshold for dithering effect
        float pixelFrac = fract(fragCoord / uPixelSize).x + fract(fragCoord / uPixelSize).y;
        float threshold = hash(floor(fragCoord / uPixelSize)) * 0.3;
        float alpha = step(threshold, finalNoise) * edgeFade;

        vec3 col = uColor;
        // Add depth shading
        col = mix(col * 0.3, col, finalNoise);
        col += vec3(0.1) * (1.0 - finalNoise) * 0.5;

        gl_FragColor = vec4(col, alpha * 0.7);
      }
    `;

    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const onMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      uniforms.uMouse.value.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
    };
    el.addEventListener('mousemove', onMouse);

    let start = Date.now();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      uniforms.uTime.value = (Date.now() - start) / 1000;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      uniforms.uResolution.value.set(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      el.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [color, pixelSize, speed, enableRipples, rippleSpeed]);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
}
