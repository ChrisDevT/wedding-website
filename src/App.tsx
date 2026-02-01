import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Header } from './components/Header';
import { DateLocation } from './components/DateLocation';
import { WeSaidYes } from './components/WeSaidYes';
import { Countdown } from './components/Countdown';
import { Locations } from './components/Locations';
import { Schedule } from './components/Schedule';
import { FilmStrip } from './components/FilmStrip';
import { Accommodation } from './components/Accommodation';
import { DressCode } from './components/DressCode';
import { RSVPForm } from './components/RSVPForm';
import { PhotoUpload } from './components/PhotoUpload';
import { AdminDashboard } from './components/AdminDashboard';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.documentElement.style.setProperty('--scroll', scrolled.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (window.location.hash === '#admin') {
    if (!showAdmin) setShowAdmin(true);
  }

  if (showAdmin) {
    return (
      <LanguageProvider>
        <AdminDashboard />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-paper relative z-0">
        <LanguageSwitcher />
        <Header />
        <DateLocation />
        <WeSaidYes />
        <Countdown />
        <Locations />
        <Schedule />
        <FilmStrip />
        <Accommodation />
        <DressCode />
        <RSVPForm />
        <PhotoUpload />

        <footer className="py-16 border-t-0.5 border-bronze/20 bg-charcoal">
          <div className="text-center">
            <p className="editorial-label text-paper/60 mb-4">May 30th, 2026 • Málaga, España</p>
            <button
              onClick={() => setShowAdmin(true)}
              className="text-xs text-paper/40 hover:text-paper/60 transition-colors font-mono"
            >
              Admin
            </button>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}

export default App;
