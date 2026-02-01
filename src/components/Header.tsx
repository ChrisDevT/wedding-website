import { OrganicImage } from './OrganicImage';
import { EditorialLabel } from './EditorialLabel';
import { useLanguage } from '../contexts/LanguageContext';

export const Header = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen grid md:grid-cols-2 gap-0 overflow-hidden">
      <div className="relative h-[60vh] md:h-screen">
        <OrganicImage
          src="/header.png"
          alt="Wedding celebration"
          edgeStyle={3}
          aspectRatio="aspect-[2/3] h-full"
          className="animate-fade-in w-full h-full"
        />
      </div>

      <div className="relative flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16 md:py-32 -mt-12 sm:-mt-16 md:mt-0 md:-ml-16 z-10 bg-paper/95">
        <EditorialLabel className="mb-4 sm:mb-6 md:mb-12 animate-slide-up">
          {t('header.subtitle')}
        </EditorialLabel>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-display text-dark-brown mb-4 sm:mb-6 md:mb-8 animate-slide-up animation-delay-200 leading-[0.9] tracking-tight">
          <span className="italic">Tatiana</span>
          <br />
          <span className="font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl">&</span>
          <br />
          <span className="italic">Christian</span>
        </h1>
      </div>
    </div>
  );
};