import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface GalleryPhoto {
  id: string;
  file_path: string;
  aspect_ratio: string;
  caption: string | null;
}

export function FilmStrip() {
  const { language } = useLanguage();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGalleryPhotos();
  }, []);

  const loadGalleryPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('wedding_photos')
        .select('id, file_path, aspect_ratio, caption')
        .eq('category', 'gallery')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (err) {
      console.error('Error loading gallery photos:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = (path: string) => {
    const { data } = supabase.storage.from('wedding-photos').getPublicUrl(path);
    return data.publicUrl;
  };

  const getAspectClass = (aspect: string) => {
    switch (aspect) {
      case 'tall': return 'aspect-[3/4]';
      case 'wide': return 'aspect-[4/3]';
      case 'square': return 'aspect-square';
      default: return 'aspect-[3/4]';
    }
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-charcoal relative">
        <div className="px-4 sm:px-6 md:px-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-paper text-center mb-12 sm:mb-16 md:mb-20 tracking-wide">
            {language === 'en' ? 'Our Moments' : 'Nuestros Momentos'}
          </h2>
          <div className="text-center text-paper/70">
            {language === 'en' ? 'Loading photos...' : 'Cargando fotos...'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-charcoal relative">
      <div className="px-4 sm:px-6 md:px-8">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-paper text-center mb-12 sm:mb-16 md:mb-20 tracking-wide">
          {language === 'en' ? 'Our Moments' : 'Nuestros Momentos'}
        </h2>

        {photos.length === 0 ? (
          <div className="text-center text-paper/70">
            {language === 'en' ? 'No photos yet' : 'No hay fotos aún'}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid group cursor-pointer"
              >
                <div className={`relative ${getAspectClass(photo.aspect_ratio)} overflow-hidden bg-bronze/10 transition-all duration-500 group-hover:-translate-y-2`}>
                  <img
                    src={getPhotoUrl(photo.file_path)}
                    alt={photo.caption || 'Wedding memory'}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                    style={{ filter: 'brightness(0.95)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
