import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function StickyRSVP() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  const buttonText = { en: 'RSVP', es: 'CONFIRMAR', uk: 'ПІДТВЕРДИТИ' };
  const text = buttonText[language as 'en' | 'es' | 'uk'];

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToRSVP}
      className={`fixed bottom-8 right-8 z-50 bg-charcoal text-paper px-8 py-5 font-display text-lg tracking-wider transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {text}
    </button>
  );
}
