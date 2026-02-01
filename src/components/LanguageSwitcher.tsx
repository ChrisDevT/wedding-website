import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-3 right-3 sm:top-6 sm:right-6 z-50">
      <div className="bg-cream/95 backdrop-blur-sm rounded-full shadow-md p-0.5 sm:p-1 flex items-center gap-0.5 sm:gap-1">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all text-xs sm:text-sm font-medium min-h-[36px] sm:min-h-[40px] ${
            language === 'en'
              ? 'bg-caramel text-white'
              : 'text-brown hover:bg-beige'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('es')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all text-xs sm:text-sm font-medium min-h-[36px] sm:min-h-[40px] ${
            language === 'es'
              ? 'bg-caramel text-white'
              : 'text-brown hover:bg-beige'
          }`}
        >
          ES
        </button>
      </div>
    </div>
  );
};