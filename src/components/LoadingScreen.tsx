import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';

const ICONS = [
  { label: 'TSX',  color: '#3178c6', bg: 'rgba(49,120,198,0.15)' },
  { label: 'JS',   color: '#f7df1e', bg: 'rgba(247,223,30,0.15)' },
  { label: 'HTML', color: '#e34f26', bg: 'rgba(227,79,38,0.15)' },
  { label: 'TW',   color: '#38bdf8', bg: 'rgba(56,189,248,0.15)' },
  { label: 'PY',   color: '#4b8bbe', bg: 'rgba(75,139,190,0.15)' },
];

const TEXT = 'Welcome To My Portofolio';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [show, setShow]         = useState(true);
  const [charIdx, setCharIdx]   = useState(0);
  const [progress, setProgress] = useState(0);
  const [iconStep, setIconStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setInterval(() => setIconStep((p) => (p < ICONS.length ? p + 1 : p)), 200);
    const t2 = setInterval(() => setCharIdx((p) => { if (p >= TEXT.length) { clearInterval(t2); return p; } return p + 1; }), 60);
    const t3 = setInterval(() => setProgress((p) => { if (p >= 100) { clearInterval(t3); return 100; } return p + 2; }), 40);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    setTimeout(() => {
      if (ref.current) gsap.to(ref.current, { opacity: 0, y: -20, duration: 0.7, ease: 'power3.inOut', onComplete: () => { setShow(false); onFinish(); } });
    }, 500);
  }, [progress, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <div ref={ref} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ background: '#080808' }}>
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(177,158,239,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(177,158,239,0.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute w-96 h-96 rounded-full opacity-[0.08]"
            style={{ background: 'radial-gradient(circle,#5227FF,transparent)', top: '15%', left: '50%', transform: 'translateX(-50%)', filter: 'blur(70px)' }} />

          <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="flex gap-3">
              {ICONS.map((icon, i) => (
                <motion.div key={icon.label}
                  initial={{ opacity: 0, y: 24, scale: 0.6 }}
                  animate={iconStep > i ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 420, damping: 22 }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center font-mono text-xs font-bold border"
                    style={{ background: icon.bg, borderColor: icon.color + '50', color: icon.color, boxShadow: iconStep > i ? `0 0 18px ${icon.color}30` : 'none' }}>
                    {icon.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <h1 className="font-display font-bold tracking-tight mb-2"
                style={{ fontSize: 'clamp(2.2rem,6vw,4.5rem)', letterSpacing: '-0.02em', minHeight: '1.2em' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #222222 0%, #666666 35%, #bbbbbb 65%, #ffffff 100%)',
                  backgroundSize: '100% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {TEXT.slice(0, charIdx)}
                  {charIdx < TEXT.length && (
                    <span style={{ WebkitTextFillColor: 'rgba(177,158,239,0.7)', animation: 'blink 0.8s infinite', display: 'inline-block', marginLeft: 2 }}>|</span>
                  )}
                </span>
              </h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: charIdx > 4 ? 1 : 0 }}
                className="text-xs font-mono tracking-widest uppercase" style={{ color: '#444' }}>
                Loading experience...
              </motion.p>
            </div>

            <div className="w-64 h-px relative" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div className="absolute left-0 top-0 h-full transition-all duration-100"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#5227FF,#B19EEF,#FF9FFC)', boxShadow: '0 0 8px rgba(177,158,239,0.5)' }} />
            </div>

            <span className="font-mono text-xs tabular-nums" style={{ color: '#444' }}>
              {String(progress).padStart(3, '0')}%
            </span>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}