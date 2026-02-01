import { useLanguage } from '../contexts/LanguageContext';
import { ThinDivider } from './ThinDivider';

export const Quote = () => {
  const { t } = useLanguage();

  return (
    <div className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto md:ml-[20%]">
        <ThinDivider className="w-16 sm:w-20 md:w-24 mb-8 sm:mb-10 md:mb-12" />

        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif text-dark-brown italic leading-relaxed mb-8 sm:mb-10 md:mb-12">
          {t('quote.text')}
        </blockquote>

        <ThinDivider className="w-16 sm:w-20 md:w-24 mb-6 sm:mb-7 md:mb-8" />

        <p className="text-bronze text-xs sm:text-sm tracking-wide">— {t('quote.author')}</p>
      </div>
    </div>
  );
};