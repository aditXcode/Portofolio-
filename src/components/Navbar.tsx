import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';

const NAV_ITEMS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState('Home');
  const [menuOpen, setMenuOpen]   = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // ── Scroll‑spy: update active berdasarkan section yang sedang di‑view ──
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        // Ambil section yang paling banyak terlihat
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          const found = NAV_ITEMS.find((item) => item.href === `#${id}`);
          if (found) setActive(found.label);
        }
      },
      {
        rootMargin: '-30% 0px -60% 0px', // trigger saat section memasuki 30% atas viewport
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Blur navbar saat scroll ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Entrance animation ──
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
      );
    }
  }, []);

  const handleNav = (label: string, href: string) => {
    setActive(label);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 z-[1000] w-full max-w-2xl px-4"
      style={{ transform: 'translateX(-50%)' }}
    >
      <motion.div
        className={`nav-pill flex items-center justify-between px-6 py-3 transition-all duration-500 ${
          scrolled ? 'nav-pill-scrolled' : ''
        }`}
        animate={{
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(177,158,239,0.08)'
            : '0 2px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* ── Logo ── */}
        <motion.a
          href="#home"
          onClick={() => handleNav('Home', '#home')}
          className="font-display font-bold text-sm tracking-tight flex items-center gap-2"
          data-cursor="hover"
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
            style={{
              background: 'rgba(177,158,239,0.15)',
              color: '#B19EEF',
              border: '1px solid rgba(177,158,239,0.2)',
            }}
          >
            {'</>'}
          </div>
          <span className="gradient-text">Adit</span>
        </motion.a>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleNav(item.label, item.href)}
              className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200"
              style={{ color: active === item.label ? '#B19EEF' : '#666' }}
              whileHover={{ color: '#B19EEF' }}
              data-cursor="hover"
            >
              {active === item.label && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(177,158,239,0.1)',
                    border: '1px solid rgba(177,158,239,0.15)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.a
          href="#contact"
          onClick={() => handleNav('Contact', '#contact')}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-mono"
          style={{
            background: 'rgba(177,158,239,0.15)',
            border: '1px solid rgba(177,158,239,0.25)',
            color: '#B19EEF',
          }}
          whileHover={{ background: 'rgba(177,158,239,0.25)', scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          data-cursor="hover"
        >
          Hire Me <span>↗</span>
        </motion.a>

        {/* ── Mobile hamburger ── */}
        <motion.button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor="hover"
        >
          <motion.div
            className="w-5 h-px"
            style={{ background: '#B19EEF' }}
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
          />
          <motion.div
            className="w-5 h-px"
            style={{ background: '#B19EEF' }}
            animate={{ opacity: menuOpen ? 0 : 1 }}
          />
          <motion.div
            className="w-5 h-px"
            style={{ background: '#B19EEF' }}
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
          />
        </motion.button>
      </motion.div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="md:hidden mt-2 nav-pill p-4 flex flex-col gap-2"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.label, item.href)}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: active === item.label ? '#B19EEF' : '#888',
                  background:
                    active === item.label
                      ? 'rgba(177,158,239,0.08)'
                      : 'transparent',
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}