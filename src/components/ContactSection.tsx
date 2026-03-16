import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import GradientText from './GradientText';

const SOCIAL = [
  {
    name: 'GitHub', href: 'https://github.com/', color: '#fff',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    name: 'TikTok', href: 'https://tiktok.com/', color: '#ff0050',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/></svg>,
  },
  {
    name: 'Instagram', href: 'https://instagram.com/', color: '#E1306C',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>,
  },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="contact" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle,#5227FF,transparent)', filter: 'blur(80px)' }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#B19EEF' }}>Contact</span>
            <div className="section-line" style={{ transform: 'scaleX(-1)' }} />
          </div>

          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-tight mb-5">
            <GradientText colors={['#ffffff', '#888888', '#444444']} animationSpeed={10}>Let's work</GradientText>
            <br />
            <span style={{ color: '#1e1e1e' }}>together.</span>
          </h2>

          <p className="text-lg mb-12" style={{ color: '#555' }}>
            Saya terbuka untuk kolaborasi, belajar bareng, dan proyek seru!<br />
            Hubungi saya lewat social media di bawah ini.
          </p>

          <div className="flex flex-wrap gap-5 justify-center mb-12">
            {SOCIAL.map((s, i) => (
              <motion.a key={s.name} href={s.href} target="_blank" rel="noreferrer"
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 + 0.3 }}
                className="flex flex-col items-center gap-3 p-7 rounded-2xl glass-card glass-card-hover"
                style={{ minWidth: 130 }} whileHover={{ y: -4 }} data-cursor="hover">
                <motion.div style={{ color: '#555' }} whileHover={{ color: s.color, scale: 1.1 }} transition={{ duration: 0.18 }}>
                  {s.icon}
                </motion.div>
                <span className="text-sm font-mono" style={{ color: '#444' }}>{s.name}</span>
              </motion.a>
            ))}
          </div>

          <motion.a href="mailto:hello@youremail.com"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold font-display text-sm text-white"
            style={{ background: 'linear-gradient(135deg,#5227FF,#B19EEF)', boxShadow: '0 0 30px rgba(82,39,255,0.3)' }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 50px rgba(82,39,255,0.5)' }} whileTap={{ scale: 0.97 }} data-cursor="hover">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Send an Email
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-8 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold"
            style={{ background: 'rgba(177,158,239,0.1)', color: '#B19EEF', border: '1px solid rgba(177,158,239,0.2)' }}>
            {'<>'}
          </div>
          <span className="text-sm font-display font-semibold gradient-text">Adit Kusuma</span>
        </div>
        <p className="text-xs font-mono" style={{ color: '#333' }}>
          © {new Date().getFullYear()} Adit Kusuma · Built with React, TypeScript & GSAP · All rights reserved
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#B19EEF', animation: 'pulse 2s infinite' }} />
          <span className="text-xs font-mono" style={{ color: '#444' }}>Available for hire</span>
        </div>
      </div>
    </footer>
  );
}
