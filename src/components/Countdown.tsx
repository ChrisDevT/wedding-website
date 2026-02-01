import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Countdown = () => {
  const { t } = useLanguage();
  const weddingDate = new Date('2026-05-30T13:00:00');

  const calculateTimeLeft = () => {
    const difference = weddingDate.getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: t('countdown.days') },
    { value: timeLeft.hours, label: t('countdown.hours') },
    { value: timeLeft.minutes, label: t('countdown.minutes') },
    { value: timeLeft.seconds, label: t('countdown.seconds') },
  ];

  return (
    <div className="relative py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Mobile: 2x2 grid with clean layout */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:hidden">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center gap-2 py-4">
              <div className="text-4xl sm:text-5xl font-serif italic text-dark-brown tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="editorial-label text-bronze">{unit.label}</div>
            </div>
          ))}
        </div>

        {/* Desktop: Horizontal layout with dividers */}
        <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex items-center gap-8 lg:gap-12">
              <div className="flex flex-col items-center gap-4">
                <div className="text-6xl lg:text-7xl xl:text-8xl font-serif italic text-dark-brown tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="editorial-label text-bronze">{unit.label}</div>
              </div>
              {index < timeUnits.length - 1 && (
                <div className="w-px h-20 lg:h-24 bg-bronze/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
