import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import PixelBlast from './PixelBlast';
import GradientText from './GradientText';
import ScrollVelocity from './ScrollVelocity';

const MARQUEE = ['JavaScript', 'TypeScript', 'React', 'HTML5', 'TailwindCSS', 'Python', 'Node.js', 'Three.js', 'GSAP', 'Figma'];

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    if (badgeRef.current) tl.fromTo(badgeRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll('.ch');
      tl.fromTo(chars, { opacity: 0, y: 50, rotateX: -25 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.025, ease: 'power3.out' }, '-=0.2');
    }
    if (subRef.current) tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
    if (ctaRef.current) tl.fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.25');
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <PixelBlast color="#B19EEF" pixelSize={4} speed={0.5} enableRipples rippleSpeed={0.4} />
      </div>
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at center, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.88) 65%, #080808 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[1]" style={{ background: 'linear-gradient(to top, #080808, transparent)' }} />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
        <div ref={badgeRef} className="opacity-0 mb-8 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
            style={{ background: 'rgba(177,158,239,0.08)', border: '1px solid rgba(177,158,239,0.2)', color: '#B19EEF' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#B19EEF', boxShadow: '0 0 6px #B19EEF', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            Open to Learn & Collaborate
          </div>
        </div>

        <h1 ref={headingRef} className="font-display font-bold leading-none tracking-tighter mb-4"
          style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', perspective: '800px' }}>
          {['Adit', 'Kusuma'].map((word, wi) => (
            <span key={wi} className="block overflow-hidden">
              {word.split('').map((char, ci) => (
                <span key={ci} className="ch inline-block"
                  style={{ color: wi === 0 ? '#ffffff' : 'transparent', WebkitTextStroke: wi === 1 ? '1px rgba(177,158,239,0.45)' : '0', opacity: 0 }}>
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="font-mono text-sm tracking-widest uppercase mb-6" style={{ color: '#444' }}>
          Student · Web Developer · 15 y.o.
        </p>

        <p ref={subRef} className="opacity-0 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: '#666' }}>
          Pelajar 15 tahun yang membangun{' '}
          <GradientText colors={['#B19EEF', '#5227FF', '#FF9FFC']} animationSpeed={4}>pengalaman web yang keren</GradientText>.
          {' '}Belajar setiap hari, satu commit satu langkah maju.
        </p>

        <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-4 justify-center">
          <motion.button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full font-semibold text-sm font-display text-white"
            style={{ background: 'linear-gradient(135deg, #5227FF, #B19EEF)', boxShadow: '0 0 30px rgba(82,39,255,0.3)' }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(82,39,255,0.5)' }} whileTap={{ scale: 0.97 }} data-cursor="hover">
            View Projects ↗
          </motion.button>
          <motion.button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full font-semibold text-sm font-display"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#aaa' }}
            whileHover={{ background: 'rgba(255,255,255,0.1)', color: '#fff', scale: 1.02 }} whileTap={{ scale: 0.97 }} data-cursor="hover">
            About Me
          </motion.button>
        </div>

        <motion.div className="mt-20 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#333' }}>scroll</span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(177,158,239,0.5), transparent)' }} />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <ScrollVelocity texts={[MARQUEE.join(' · '), MARQUEE.slice().reverse().join(' · ')]} velocity={60} className="text-xs font-mono" />
      </div>
    </section>
  );
}
