import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Start at 30% volume

      const handleCanPlay = () => setIsLoaded(true);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener('canplaythrough', handleCanPlay);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlay);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.log('Autoplay prevented:', err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/la-vida-entera.mp3"
        loop
        preload="auto"
      />

      <button
        onClick={togglePlay}
        className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 ${
          isPlaying
            ? 'bg-bronze text-paper'
            : 'bg-paper/95 text-bronze border border-bronze/30'
        }`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>
    </>
  );
};
