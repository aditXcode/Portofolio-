import { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientText from './GradientText';
import ScrollVelocity from './ScrollVelocity';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: 'JavaScript', level: 80, color: '#f7df1e' },
  { name: 'TypeScript', level: 70, color: '#3178c6' },
  { name: 'React',      level: 75, color: '#61dafb' },
  { name: 'HTML5',      level: 90, color: '#e34f26' },
  { name: 'CSS3',       level: 85, color: '#1572b6' },
  { name: 'TailwindCSS',level: 80, color: '#38bdf8' },
  { name: 'Python',     level: 65, color: '#4b8bbe' },
  { name: 'GSAP',       level: 60, color: '#88ce02' },
];

const TOOLS = ['VS Code','Git','GitHub','Figma','Vite','npm','Vercel','Netlify','Postman','ESLint'];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef    = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!barsRef.current) return;
    barsRef.current.querySelectorAll('.bar-fill').forEach((bar) => {
      gsap.fromTo(bar, { width: '0%' }, { width: `${(bar as HTMLElement).dataset.w}%`, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: bar, start: 'top 88%' } });
    });
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle,#FF9FFC,transparent)', filter: 'blur(70px)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#B19EEF' }}>Skills</span>
          </div>
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-tight">
            <GradientText colors={['#ffffff', '#888888', '#444444']} animationSpeed={12}>Tech</GradientText>
            <span className="ml-3" style={{ color: '#1e1e1e' }}>Stack.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div ref={barsRef}>
            <p className="font-display font-medium text-base mb-8" style={{ color: '#666' }}>Proficiency Level</p>
            <div className="space-y-5">
              {SKILLS.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.04 }}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-mono" style={{ color: '#999' }}>{s.name}</span>
                    <span className="text-xs font-mono" style={{ color: '#444' }}>{s.level}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="bar-fill h-full rounded-full" data-w={s.level}
                      style={{ width: 0, background: `linear-gradient(90deg,${s.color}66,${s.color})`, boxShadow: `0 0 6px ${s.color}40` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display font-medium text-base mb-8" style={{ color: '#666' }}>Tools & Technologies</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {TOOLS.map((tool, i) => (
                <motion.span key={tool} initial={{ opacity: 0, scale: 0.85 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.035, type: 'spring', stiffness: 300 }}
                  className="skill-tag">{tool}</motion.span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[{ n: '10+', label: 'Projects' }, { n: '1+', label: 'Tahun Coding' }, { n: '5+', label: 'Tech Stack' }].map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-5 text-center">
                  <p className="font-display font-bold text-2xl mb-1 gradient-text-accent">{s.n}</p>
                  <p className="text-xs font-mono" style={{ color: '#444' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <ScrollVelocity
          texts={['JavaScript · TypeScript · React · TailwindCSS · Python · GSAP · Node.js · HTML5', 'CSS3 · Figma · Git · Vite · Vercel · REST API · Three.js']}
          velocity={45} className="text-xs font-mono" />
      </div>
    </section>
  );
}
