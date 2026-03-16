import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  pauseOnHover?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#ffffff', '#888888', '#444444'],
  animationSpeed = 8,
  showBorder = false,
  pauseOnHover = false,
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [bgPos, setBgPos] = useState('0% 50%');
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animationDuration = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (isPaused) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += delta;

    // yoyo: 0 → 100 → 0 → 100 ...
    const fullCycle = animationDuration * 2;
    const cycleTime = elapsedRef.current % fullCycle;
    const p =
      cycleTime < animationDuration
        ? (cycleTime / animationDuration) * 100
        : 100 - ((cycleTime - animationDuration) / animationDuration) * 100;

    setBgPos(`${p}% 50%`);
  });

  useEffect(() => {
    elapsedRef.current = 0;
    setBgPos('0% 50%');
  }, [animationSpeed]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: '300% 100%',
    backgroundPosition: bgPos,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const borderGradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: '300% 100%',
    backgroundPosition: bgPos,
  };

  return (
    <motion.span
      className={`relative inline-block font-medium ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <span
          className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
          style={{
            ...borderGradientStyle,
            padding: '1px',
          }}
        >
          <span
            className="block w-full h-full rounded-[1.25rem]"
            style={{ background: '#080808' }}
          />
        </span>
      )}
      <span style={gradientStyle}>{children}</span>
    </motion.span>
  );
}