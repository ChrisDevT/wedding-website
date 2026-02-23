import { useLanguage } from '../contexts/LanguageContext';

interface GalleryPhoto {
  id: string;
  src: string;
  aspect: string;
  alt: string;
}

const galleryPhotos: GalleryPhoto[] = [
  { id: '1', src: '/header.jpg', aspect: 'wide', alt: 'Wedding celebration' },
  { id: '2', src: '/we-said-yes.jpg', aspect: 'wide', alt: 'We said yes' },
  { id: '3', src: '/iglesia-san-juan.jpg', aspect: 'wide', alt: 'Ceremony venue' },
  { id: '4', src: '/casita-de-madera.jpg', aspect: 'wide', alt: 'Reception venue' },
  { id: '5', src: '/photo-upload.jpg', aspect: 'tall', alt: 'Couple photo' },
];

export function FilmStrip() {
  const { language } = useLanguage();

  const text = {
    en: { title: 'Our Moments' },
    es: { title: 'Nuestros Momentos' },
    uk: { title: 'Наші Моменти' }
  };
  const t = text[language as 'en' | 'es' | 'uk'];

  const getAspectClass = (aspect: string) => {
    switch (aspect) {
      case 'tall': return 'aspect-[3/4]';
      case 'wide': return 'aspect-[4/3]';
      case 'square': return 'aspect-square';
      default: return 'aspect-[3/4]';
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-charcoal relative">
      <div className="px-4 sm:px-6 md:px-8">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-paper text-center mb-12 sm:mb-16 md:mb-20 tracking-wide">
          {t.title}
        </h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid group cursor-pointer"
            >
              <div className={`relative ${getAspectClass(photo.aspect)} overflow-hidden bg-bronze/10 transition-all duration-500 group-hover:-translate-y-2`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                  style={{ filter: 'brightness(0.95)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
