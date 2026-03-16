import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Props {
  src?: string;
  isVideo?: boolean;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function TiltCard({ src, isVideo = false, alt = '', className = '', style, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [err, setErr] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 280, damping: 28 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 280, damping: 28 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  };

  const showMedia = !!(src && !err);

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1000, ...style }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
        className="rounded-2xl overflow-hidden"
      >
        {showMedia && !isVideo && (
          <img
            src={src}
            alt={alt}
            onError={() => setErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
        {showMedia && isVideo && (
          <video
            src={src}
            autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
        {!showMedia && (
          <div style={{ width: '100%', height: '100%' }}>{children}</div>
        )}

        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 25%, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: hovered
              ? '0 0 0 1px rgba(177,158,239,0.45), 0 28px 64px rgba(82,39,255,0.38)'
              : '0 0 0 1px rgba(255,255,255,0.07)',
          }}
          transition={{ duration: 0.28 }}
        />
      </motion.div>
    </div>
  );
}
