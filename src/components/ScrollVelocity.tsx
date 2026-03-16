import { useRef, useLayoutEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'motion/react';

function useWidth(ref: React.RefObject<HTMLElement | null>) {
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const upd = () => { if (ref.current) setW(ref.current.offsetWidth); };
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, [ref]);
  return w;
}

function VelocityText({ children, base = 100, className = '' }: { children: React.ReactNode; base?: number; className?: string }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const ref = useRef<HTMLSpanElement>(null);
  const w = useWidth(ref);
  const dir = useRef(1);

  const x = useTransform(baseX, (v) => {
    if (w === 0) return '0px';
    const range = w;
    const mod = (((v % range) + range) % range);
    return `${mod - range}px`;
  });

  useAnimationFrame((_t, delta) => {
    let mv = dir.current * base * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    mv += dir.current * mv * factor.get();
    baseX.set(baseX.get() + mv);
  });

  const copies = Array.from({ length: 8 });

  return (
    <div className="relative overflow-hidden py-2">
      <motion.div className="flex whitespace-nowrap font-display font-bold tracking-tight" style={{ x }}>
        {copies.map((_, i) => (
          <span key={i} ref={i === 0 ? ref : null} className={`flex-shrink-0 ${className}`}>{children}</span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity({ texts = [], velocity = 100, className = '' }: { texts?: string[]; velocity?: number; className?: string }) {
  return (
    <section className="py-4 overflow-hidden">
      {texts.map((text, i) => (
        <VelocityText key={i} base={i % 2 !== 0 ? -velocity : velocity} className={className}>
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
}
