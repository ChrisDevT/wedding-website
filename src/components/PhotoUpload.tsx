import { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const PhotoUpload = () => {
  const { language } = useLanguage();
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const decorativePhoto = '/photo-upload.jpg';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(false);
    setSuccess(false);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('wedding-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('wedding_photos')
        .insert([{
          guest_name: 'Guest',
          file_path: filePath,
          file_name: file.name,
          caption: null,
          category: 'user_upload',
          aspect_ratio: 'tall',
          display_order: 0
        }]);

      if (dbError) throw dbError;

      setSuccess(true);
      if (fileInputRef.current) fileInputRef.current.value = '';

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error uploading photo:', err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setUploading(false);
    }
  };

  const text = {
    en: {
      heading: 'Would you help us capture the memories?',
      subtext: 'Please upload the photos you take during our special day',
      button: 'UPLOAD PHOTOS',
      uploading: 'Uploading...',
      success: 'Photo uploaded successfully!',
      error: 'Error uploading photo. Please try again.'
    },
    es: {
      heading: '¿Nos ayudarías a capturar los recuerdos?',
      subtext: 'Por favor, sube las fotos que tomes durante nuestro día especial',
      button: 'SUBIR FOTOS',
      uploading: 'Subiendo...',
      success: '¡Foto subida exitosamente!',
      error: 'Error al subir la foto. Por favor, inténtalo de nuevo.'
    }
  };

  const t = text[language as 'en' | 'es'];

  return (
    <div className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            {decorativePhoto && (
              <img
                src={decorativePhoto}
                alt="Couple"
                className="w-full aspect-[3/4] object-cover"
              />
            )}
          </div>

          <div className="order-1 md:order-2 space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-dark-brown leading-tight">
              {t.heading}
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-dark-brown/70 leading-relaxed">
              {t.subtext}
            </p>

            {success && (
              <div className="p-4 border border-green-600 text-green-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {t.success}
              </div>
            )}

            {error && (
              <div className="p-4 border border-red-600 text-red-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {t.error}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              onClick={handleButtonClick}
              disabled={uploading}
              className="w-full bg-[#1A1A1A] text-paper font-display text-base sm:text-lg tracking-widest py-5 sm:py-6 min-h-[48px] hover:bg-dark-brown transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? t.uploading : t.button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};