import { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle, AlertCircle, Upload } from 'lucide-react';

export const PhotoUpload = () => {
  const { language } = useLanguage();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedCount, setUploadedCount] = useState(0);
  const decorativePhoto = '/photo-upload.jpg';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadSingleFile = async (file: File): Promise<void> => {
    // 1. Get presigned URL from our API
    const urlResponse = await fetch('/api/get-upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type || 'image/jpeg',
        fileSize: file.size,
      }),
    });

    if (!urlResponse.ok) {
      const err = await urlResponse.json();
      throw new Error(err.error || 'Could not get upload URL');
    }

    const { uploadUrl } = await urlResponse.json();

    // 2. Upload file directly to S3 using the presigned URL
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type || 'image/jpeg' },
    });

    if (!uploadResponse.ok) {
      throw new Error('Upload to S3 failed');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);
    setUploadedCount(0);

    let completed = 0;
    let failed = 0;

    for (const file of files) {
      try {
        await uploadSingleFile(file);
        completed++;
        setUploadedCount(completed);
        setProgress(Math.round((completed / files.length) * 100));
      } catch (err: any) {
        console.error('Error uploading file:', file.name, err);
        failed++;
      }
    }

    setUploading(false);

    if (failed === 0) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setUploadedCount(0);
        setProgress(0);
      }, 5000);
    } else if (completed === 0) {
      setError(t.error);
      setTimeout(() => setError(null), 5000);
    } else {
      setError(`${completed}/${files.length} ${t.partialSuccess}`);
      setTimeout(() => setError(null), 5000);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const text = {
    en: {
      heading: 'Would you help us capture the memories?',
      subtext: 'Please upload the photos you take during our special day',
      button: 'UPLOAD PHOTOS',
      uploading: 'Uploading',
      success: 'Photos uploaded successfully! Thank you 💕',
      error: 'Error uploading photos. Please try again.',
      partialSuccess: 'photos uploaded',
      selectMore: 'You can select multiple photos at once',
    },
    es: {
      heading: '¿Nos ayudarías a capturar los recuerdos?',
      subtext: 'Por favor, sube las fotos que tomes durante nuestro día especial',
      button: 'SUBIR FOTOS',
      uploading: 'Subiendo',
      success: '¡Fotos subidas exitosamente! Gracias 💕',
      error: 'Error al subir las fotos. Por favor, inténtalo de nuevo.',
      partialSuccess: 'fotos subidas',
      selectMore: 'Puedes seleccionar varias fotos a la vez',
    },
    uk: {
      heading: 'Чи допоможете нам зберегти спогади?',
      subtext: 'Будь ласка, завантажте фотографії з нашого особливого дня',
      button: 'ЗАВАНТАЖИТИ ФОТО',
      uploading: 'Завантаження',
      success: 'Фото успішно завантажено! Дякуємо 💕',
      error: 'Помилка завантаження. Спробуйте ще раз.',
      partialSuccess: 'фото завантажено',
      selectMore: 'Можна вибрати кілька фото одночасно',
    },
  };

  const t = text[language as 'en' | 'es' | 'uk'];

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

            <p className="text-sm text-dark-brown/50 italic">
              {t.selectMore}
            </p>

            {success && (
              <div className="p-4 border border-green-600 text-green-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>{t.success}</span>
              </div>
            )}

            {error && (
              <div className="p-4 border border-red-600 text-red-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-dark-brown/70">
                  <span>{t.uploading}... {uploadedCount > 0 && `(${uploadedCount})`}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-bronze/20 h-2 overflow-hidden">
                  <div
                    className="bg-charcoal h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              onClick={handleButtonClick}
              disabled={uploading}
              className="w-full bg-[#1A1A1A] text-paper font-display text-base sm:text-lg tracking-widest py-5 sm:py-6 min-h-[48px] hover:bg-dark-brown transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <Upload className="w-5 h-5" />
              {uploading ? t.uploading.toUpperCase() : t.button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
