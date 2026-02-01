import { useLanguage } from '../contexts/LanguageContext';

export const WeSaidYes = () => {
  const { t } = useLanguage();
  const engagementPhoto = '/we-said-yes.jpeg';

  return (
    <section className="relative py-8 sm:py-12 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-paper overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
            {engagementPhoto && (
              <img
                src={engagementPhoto}
                alt="Engagement"
                className="w-full h-full object-cover"
                style={{
                  filter: 'sepia(0.15) contrast(1.05)',
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-paper/30 to-transparent" />
          </div>

          <div className="relative md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 -mt-16 sm:-mt-20 md:mt-0 mx-4 md:mx-0">
            <div
              className="bg-[#F9F5F0] px-6 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 md:py-14 lg:py-16 max-w-[500px] mx-auto"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(139, 117, 94, 0.15)',
                border: '1px solid rgba(139, 117, 94, 0.2)',
              }}
            >
              <div className="text-center space-y-3 sm:space-y-4">
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl text-dark-brown"
                  style={{
                    fontFamily: 'Dancing Script, cursive',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  We said yes!
                </h2>
                <div className="w-12 sm:w-16 h-px bg-bronze/30 mx-auto" />
                <p className="text-lg sm:text-xl md:text-2xl font-display text-dark-brown/80 tracking-wide">
                  30.05.2026
                </p>
                <p className="text-sm sm:text-base md:text-lg text-dark-brown/60 pt-2 leading-relaxed max-w-sm mx-auto">
                  {t('wesaidyes.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-12 sm:h-20 md:h-32 lg:h-40" />
      </div>
    </section>
  );
};
