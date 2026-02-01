import { useLanguage } from '../contexts/LanguageContext';

export const Accommodation = () => {
  const { t } = useLanguage();

  const hotels = [
    { name: 'accommodation.churriana' },
    { name: 'accommodation.guadalmar' },
    { name: 'accommodation.torremolinos' },
    { name: 'accommodation.carretera' },
    { name: 'accommodation.imperio' },
    { name: 'accommodation.centro' }
  ];

  return (
    <div className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-charcoal">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-paper text-center mb-8 sm:mb-10 md:mb-12 tracking-wide">
          {t('accommodation.title')}
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-paper/70 mb-12 sm:mb-16 md:mb-20 leading-relaxed text-center max-w-2xl mx-auto">
          {t('accommodation.subtitle')}
        </p>

        <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
          {hotels.map((hotel, index) => (
            <div key={hotel.name} className="group transition-all duration-300">
              <div className="py-4 sm:py-6 text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-paper group-hover:text-bronze transition-colors">
                  {t(hotel.name)}
                </h3>
              </div>
              {index < hotels.length - 1 && (
                <div className="h-px bg-bronze/20" />
              )}
            </div>
          ))}
        </div>

        <p className="text-sm sm:text-base md:text-lg text-paper/80 mt-12 sm:mt-14 md:mt-16 leading-relaxed text-center max-w-2xl mx-auto">
          {t('accommodation.helpText')}
        </p>
      </div>
    </div>
  );
};