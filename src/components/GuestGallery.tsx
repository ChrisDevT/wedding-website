import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Image as ImageIcon, RefreshCw } from 'lucide-react';

interface GuestPhoto {
  key: string;
  url: string;
  lastModified: string;
  size: number;
}

export const GuestGallery = () => {
  const { language } = useLanguage();
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const text = {
    en: {
      title: 'Guest Memories',
      subtitle: 'Photos shared by our loved ones',
      empty: 'No photos yet. Be the first to share a memory!',
      loading: 'Loading photos...',
      refresh: 'Refresh',
    },
    es: {
      title: 'Recuerdos de los Invitados',
      subtitle: 'Fotos compartidas por nuestros seres queridos',
      empty: 'Aún no hay fotos. ¡Sé el primero en compartir un recuerdo!',
      loading: 'Cargando fotos...',
      refresh: 'Actualizar',
    },
    uk: {
      title: 'Спогади Гостей',
      subtitle: 'Фотографії, поділені нашими близькими',
      empty: 'Поки немає фото. Будьте першим, хто поділиться спогадом!',
      loading: 'Завантаження фото...',
      refresh: 'Оновити',
    },
  };

  const t = text[language as 'en' | 'es' | 'uk'];

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/list-photos');
      if (!response.ok) throw new Error('Failed to load photos');
      const data = await response.json();
      setPhotos(data.photos || []);
    } catch (err) {
      console.error('Error loading photos:', err);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const isVideo = (url: string) => {
    return /\.(mp4|mov|quicktime)$/i.test(url);
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-paper">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-dark-brown mb-4 tracking-wide">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-dark-brown/70 mb-6">
            {t.subtitle}
          </p>
          <button
            onClick={loadPhotos}
            disabled={loading}
            className="inline-flex items-center gap-2 text-sm text-dark-brown/60 hover:text-dark-brown transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {t.refresh}
          </button>
        </div>

        {loading && photos.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-dark-brown/50 text-lg">{t.loading}</div>
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ImageIcon className="w-16 h-16 text-bronze/40 mb-4" />
            <p className="text-dark-brown/60 text-lg max-w-md">{t.empty}</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 md:gap-5 space-y-3 sm:space-y-4 md:space-y-5">
            {photos.map((photo) => (
              <div
                key={photo.key}
                className="break-inside-avoid group cursor-pointer overflow-hidden bg-bronze/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => !isVideo(photo.url) && setSelectedPhoto(photo.url)}
              >
                {isVideo(photo.url) ? (
                  <video
                    src={photo.url}
                    controls
                    className="w-full h-auto"
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={photo.url}
                    alt="Guest memory"
                    loading="lazy"
                    className="w-full h-auto transition-all duration-500 group-hover:brightness-105"
                    style={{ filter: 'sepia(0.05) contrast(1.02)' }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedPhoto(null)}
          >
            <img
              src={selectedPhoto}
              alt="Full size"
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:opacity-70"
              onClick={() => setSelectedPhoto(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
