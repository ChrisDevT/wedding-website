import { useLanguage } from '../contexts/LanguageContext';

const SuitIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8L20 12V16L24 20L28 16V12L24 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 16L8 20V42H40V20L32 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 16V42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 16V42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 16V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DressIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6L18 12L12 18L10 42H38L36 18L30 12L24 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 6V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 12L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 12L36 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DressCode = () => {
  const { language } = useLanguage();

  const dressCodeText = {
    en: {
      title: 'Dress Code',
      gentlemen: 'Gentlemen',
      gentlemenRule: 'Formal Suit Required',
      gentlemenDetail: 'Please wear a formal suit with tie or bowtie',
      ladies: 'Ladies',
      ladiesRule: 'Elegant Wear',
      ladiesDetail: 'Please reserve white & beige for the bride'
    },
    es: {
      title: 'Código de Vestimenta',
      gentlemen: 'Caballeros',
      gentlemenRule: 'Traje Formal Requerido',
      gentlemenDetail: 'Por favor, use traje formal con corbata o pajarita',
      ladies: 'Damas',
      ladiesRule: 'Vestimenta Elegante',
      ladiesDetail: 'Por favor, reserva el blanco y beige para la novia'
    },
    uk: {
      title: 'Дрес-код',
      gentlemen: 'Чоловіки',
      gentlemenRule: 'Офіційний костюм',
      gentlemenDetail: 'Будь ласка, одягніть офіційний костюм з краваткою або метеликом',
      ladies: 'Жінки',
      ladiesRule: 'Елегантний одяг',
      ladiesDetail: 'Будь ласка, залиште білий та бежевий для нареченої'
    }
  };

  const t = dressCodeText[language as 'en' | 'es' | 'uk'];

  return (
    <div className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-paper">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-dark-brown text-center mb-16 sm:mb-20 md:mb-24 tracking-wide">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 sm:gap-16 md:gap-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-6 sm:mb-8 flex items-center justify-center text-bronze">
              <SuitIcon />
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-dark-brown mb-2 sm:mb-3 tracking-wide">
              {t.gentlemen}
            </h3>
            <p className="text-lg sm:text-xl font-display text-dark-brown/90 mb-2">
              {t.gentlemenRule}
            </p>
            <p className="text-sm sm:text-base text-dark-brown/60 leading-relaxed max-w-xs mx-auto">
              {t.gentlemenDetail}
            </p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-6 sm:mb-8 flex items-center justify-center text-bronze">
              <DressIcon />
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-dark-brown mb-2 sm:mb-3 tracking-wide">
              {t.ladies}
            </h3>
            <p className="text-lg sm:text-xl font-display text-dark-brown/90 mb-2">
              {t.ladiesRule}
            </p>
            <p className="text-sm sm:text-base text-dark-brown/60 leading-relaxed max-w-xs mx-auto">
              {t.ladiesDetail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
