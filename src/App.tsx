import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import { ContactSection, Footer } from './components/ContactSection';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden';
  }, [loaded]);

  return (
    <>
      <CustomCursor />
      <LoadingScreen onFinish={() => setLoaded(true)} />
      {loaded && (
        <div className="relative min-h-screen" style={{ background: '#080808' }}>
          <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.012]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
          <Navbar />
          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
