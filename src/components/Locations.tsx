import { useLanguage } from '../contexts/LanguageContext';
import { OrganicImage } from './OrganicImage';
import { EditorialLabel } from './EditorialLabel';

export const Locations = () => {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10 parallax-bg"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      />

      <div className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-dark-brown text-center mb-16 sm:mb-20 md:mb-24 lg:mb-32 tracking-wide">
            {t('locations.title')}
          </h2>

          <div className="grid md:grid-cols-5 gap-8 sm:gap-10 md:gap-12 items-center mb-16 sm:mb-20 md:mb-24 lg:mb-32">
            <div className="md:col-span-3 relative">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <OrganicImage
                  src="/iglesia-san-juan.jpg"
                  alt="Ceremony location"
                  edgeStyle={1}
                  aspectRatio="aspect-[16/9]"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-6 md:-ml-32 z-10">
              <div className="bg-paper p-6 sm:p-8 md:p-10 border border-bronze/30 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(107,93,82,0.3)] transition-all duration-300">
                <EditorialLabel className="mb-3 sm:mb-4">
                  {t('locations.ceremony')}
                </EditorialLabel>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-dark-brown mb-2 sm:mb-3 leading-tight">
                  Iglesia de San Juan Bautista
                </h3>
                <p className="text-bronze text-base sm:text-lg mb-4 sm:mb-6">Málaga • 13:00</p>
                <p className="text-sm sm:text-base text-dark-brown/80 mb-4 sm:mb-6 leading-relaxed">
                  {t('locations.ceremonyDesc')}
                </p>
                <a
                  href="https://maps.app.goo.gl/E8kBGep5V9A3owd99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 min-h-[44px] text-xs sm:text-sm font-display tracking-wider text-stone-900 bg-transparent border border-stone-900 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-300"
                >
                  {t('locations.viewMap')}
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="md:col-span-2 space-y-6 md:-mr-32 z-10 order-2 md:order-1">
              <div className="bg-paper p-6 sm:p-8 md:p-10 border border-bronze/30 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(107,93,82,0.3)] transition-all duration-300">
                <EditorialLabel className="mb-3 sm:mb-4">
                  {t('locations.reception')}
                </EditorialLabel>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-dark-brown mb-2 sm:mb-3 leading-tight">
                  La Casita de Madera
                </h3>
                <p className="text-bronze text-base sm:text-lg mb-4 sm:mb-6">Churriana, Málaga • 15:00</p>
                <p className="text-sm sm:text-base text-dark-brown/80 mb-4 sm:mb-6 leading-relaxed">
                  {t('locations.receptionDesc')}
                </p>
                <a
                  href="https://maps.app.goo.gl/EHUbVzN6NQzAh8HK8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 min-h-[44px] text-xs sm:text-sm font-display tracking-wider text-stone-900 bg-transparent border border-stone-900 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-300"
                >
                  {t('locations.viewMap')}
                </a>
              </div>
            </div>

            <div className="md:col-span-3 relative order-1 md:order-2">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <OrganicImage
                  src="/casita-de-madera.jpg"
                  alt="Reception location"
                  edgeStyle={2}
                  aspectRatio="aspect-[16/9]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};