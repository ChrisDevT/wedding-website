import { useLanguage } from '../contexts/LanguageContext';

export const DateLocation = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-8 sm:py-10 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-paper">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display text-dark-brown font-bold tracking-wide leading-tight mb-3 sm:mb-4">
          {t('header.date')}
        </p>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display text-dark-brown font-bold tracking-wide">
          {t('header.location')}
        </p>
      </div>
    </section>
  );
};
