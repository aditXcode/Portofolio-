import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import TiltCard from './TiltCard';
import GradientText from './GradientText';

const PROJECTS = [
  { title: 'Portfolio Website',    desc: 'Website portfolio pribadi dengan React, TypeScript, Three.js, dan GSAP. Animasi smooth dan pixel-perfect.', tags: ['React','TypeScript','Three.js','GSAP'], year: '2024', color: '#B19EEF', link: '#' },
  { title: 'To-Do App',           desc: 'Aplikasi manajemen tugas dengan drag & drop, filter, dan dark mode. Dibangun dengan React dan localStorage.', tags: ['React','JavaScript','TailwindCSS'], year: '2024', color: '#5227FF', link: '#' },
  { title: 'Landing Page Sekolah',desc: 'Landing page modern untuk acara sekolah dengan animasi scroll dan desain responsif yang clean.', tags: ['HTML5','CSS3','JavaScript','GSAP'], year: '2024', color: '#38bdf8', link: '#' },
  { title: 'Weather App',         desc: 'Aplikasi cuaca real-time mengambil data dari OpenWeather API dengan UI interaktif dan responsif.', tags: ['React','API','TailwindCSS'], year: '2023', color: '#FF9FFC', link: '#' },
  { title: 'Python Calculator',   desc: 'Kalkulator ilmiah dengan Python yang mendukung operasi matematika kompleks dan antarmuka GUI.', tags: ['Python','Tkinter'], year: '2023', color: '#4b8bbe', link: '#' },
  { title: 'Quiz App',            desc: 'Aplikasi kuis interaktif dengan timer, skor real-time, dan leaderboard. Cocok untuk belajar bersama.', tags: ['JavaScript','HTML5','CSS3'], year: '2023', color: '#88ce02', link: '#' },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="projects" className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#B19EEF' }}>Work</span>
          </div>
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-tight">
            <GradientText colors={['#ffffff', '#888888', '#444444']} animationSpeed={12}>Selected</GradientText>
            <span className="ml-3" style={{ color: '#1e1e1e' }}>Projects.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.a key={p.title} href={p.link}
              initial={{ opacity: 0, y: 36 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.55, ease: 'easeOut' }}
              className="block group" data-cursor="hover">
              <TiltCard className="h-full">
                <div className="h-full flex flex-col p-6 rounded-2xl glass-card" style={{ minHeight: 260 }}>
                  <div className="flex justify-between items-center mb-5">
                    <span className="font-mono text-xs" style={{ color: '#3a3a3a' }}>{p.year}</span>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}60` }} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2.5 group-hover:text-white transition-colors" style={{ color: '#ccc' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#555' }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md text-xs font-mono"
                        style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}>{tag}</span>
                    ))}
                  </div>
                  <motion.div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono" style={{ color: p.color }}>View Project</span>
                    <motion.span style={{ color: p.color }} animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>→</motion.span>
                  </motion.div>
                </div>
              </TiltCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
