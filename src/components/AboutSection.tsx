import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from './TiltCard';
import GradientText from './GradientText';

gsap.registerPlugin(ScrollTrigger);

const INFO = [
  { label: 'Nama',       value: 'Adit Kusuma', icon: '✨' },
  { label: 'Umur',       value: '15 Tahun',    icon: '🎂' },
  { label: 'Gender',     value: 'Male',        icon: '👤' },
  { label: 'Pendidikan', value: 'Pelajar',     icon: '🎓' },
  { label: 'Status',     value: 'Pelajar',     icon: '📚' },
  { label: 'Location',   value: 'Indonesia',   icon: '🌏' },
];

const USE_VIDEO = false;
const MEDIA_SRC = USE_VIDEO ? '/video.mp4' : '/Adit.jpg';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' });
  const [cardH, setCardH] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!rightRef.current) return;

    const syncHeight = () => {
      if (rightRef.current) {
        setCardH(rightRef.current.offsetHeight);
      }
    };

    syncHeight();
    const ro = new ResizeObserver(syncHeight);
    ro.observe(rightRef.current);
    return () => ro.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!rightRef.current) return;
    gsap.fromTo(
      rightRef.current.querySelectorAll('.ic'),
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0, duration: 0.45, stagger: 0.055, ease: 'power3.out',
        scrollTrigger: { trigger: rightRef.current, start: 'top 82%' },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-28 px-4 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle,#5227FF,transparent)',
          filter: 'blur(90px)',
          opacity: 0.05,
          transform: 'translateY(-50%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="section-line" />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#B19EEF' }}>About</span>
          </div>
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-tight">
            <GradientText colors={['#ffffff', '#888888', '#444444']} animationSpeed={12}>A bit about</GradientText>
            <br />
            <span style={{ color: '#1e1e1e' }}>myself.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-10 items-start">

          {/* ── KIRI: Card 3D 9:16, height diambil dari konten kanan ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              height: cardH ?? undefined,
              minHeight: cardH ? undefined : 500,
            }}
          >
            <TiltCard
              src={MEDIA_SRC}
              isVideo={USE_VIDEO}
              alt="Adit Kusuma"
              style={{ width: '100%', height: '100%' }}
            >
              <div
                className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(170deg,#0d0d1a 0%,#1a1a2e 50%,#0f0f22 100%)' }}
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle,#B19EEF,transparent)', opacity: 0.1 }} />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle,#5227FF,transparent)', opacity: 0.1 }} />

                <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                    style={{
                      background: 'rgba(177,158,239,0.1)',
                      border: '1.5px solid rgba(177,158,239,0.22)',
                      boxShadow: '0 0 36px rgba(82,39,255,0.22)',
                    }}
                  >
                    👤
                  </div>
                  <div>
                    <p className="font-display font-bold text-white text-lg">Adit Kusuma</p>
                    <p className="font-mono text-xs mt-1" style={{ color: '#B19EEF' }}>Web Developer</p>
                  </div>
                  <div className="flex gap-1.5">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full"
                        style={{ background: i <= 4 ? '#B19EEF' : 'rgba(177,158,239,0.18)' }} />
                    ))}
                  </div>
                  <p className="text-xs font-mono" style={{ color: '#2a2a2a' }}>
                    {USE_VIDEO ? 'public/video.mp4' : 'public/Adit.jpg'}
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── KANAN: teks + data diri + quote ── */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="flex flex-col gap-7"
          >
            <div className="flex flex-col gap-4">
              <p className="text-lg leading-relaxed" style={{ color: '#888' }}>
                Halo! Saya{' '}
                <GradientText colors={['#B19EEF', '#5227FF', '#FF9FFC']} animationSpeed={5}>
                  Adit Kusuma
                </GradientText>
                , seorang pelajar berusia 15 tahun yang passionate di dunia web development dan teknologi.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#555' }}>
                Meski masih muda, saya terus belajar dan mengembangkan skill di bidang JavaScript, TypeScript,
                React, dan Python. Saya percaya tidak ada kata terlalu dini untuk mulai berkarya di dunia digital.
                Setiap hari adalah kesempatan belajar hal baru!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {INFO.map((item) => (
                <div
                  key={item.label}
                  className="ic glass-card glass-card-hover rounded-2xl p-4 opacity-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="text-xs font-mono mb-0.5" style={{ color: '#444' }}>{item.label}</p>
                      <p className="font-display font-semibold text-sm" style={{ color: '#ccc' }}>{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(177,158,239,0.03)', border: '1px solid rgba(177,158,239,0.09)' }}
            >
              <p className="text-sm leading-relaxed italic" style={{ color: '#555' }}>
                "Muda bukan halangan. Setiap baris kode yang saya tulis adalah langkah menuju masa depan yang saya impikan."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-5 h-px" style={{ background: 'rgba(177,158,239,0.35)' }} />
                <span className="text-xs font-mono" style={{ color: '#B19EEF' }}>Developer Motto</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
