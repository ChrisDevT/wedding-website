import { useLanguage } from '../contexts/LanguageContext';
import { InterlockingRings, ClinkingGlasses, SparklesStars, PlateAndCutlery, MusicNotes } from './HandDrawnIcons';

export const Schedule = () => {
  const { t } = useLanguage();

  const events = [
    { time: '13:00', key: 'schedule.ceremony', icon: InterlockingRings },
    { time: '14:40', key: 'schedule.reception', icon: ClinkingGlasses },
    { time: '15:00', key: 'schedule.entrada', icon: SparklesStars },
    { time: '16:00', key: 'schedule.comida', icon: PlateAndCutlery },
    { time: '17:30', key: 'schedule.fiesta', icon: MusicNotes }
  ];

  return (
    <div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-8 bg-[#E5DDD5]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-script text-dark-brown text-center mb-16 sm:mb-20 md:mb-24">
          {t('schedule.title')}
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Central vertical line (tree trunk) - only visible on desktop */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 bg-stone-800"
            style={{
              top: '50px',
              bottom: '50px'
            }}
          />

          <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
            {events.map((event, index) => {
              const Icon = event.icon;
              const isEvenIndex = index % 2 === 0;

              if (isEvenIndex) {
                // Even index: Content on left, icon on right (on desktop) / Center on mobile
                return (
                  <div key={index} className="relative">
                    {/* Mobile: Centered layout */}
                    <div className="md:hidden flex flex-col items-center gap-3 text-center">
                      <div className="animate-gentle-float">
                        <Icon />
                      </div>
                      <div
                        className="text-lg sm:text-xl font-bold text-dark-brown mb-1"
                        style={{ fontVariantNumeric: 'lining-nums' }}
                      >
                        {event.time}
                      </div>
                      <div className="text-sm sm:text-base font-light text-gray-600">
                        {t(event.key)}
                      </div>
                    </div>

                    {/* Desktop: Grid layout */}
                    <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-center">
                      {/* Left side: Time and Event Name */}
                      <div className="text-right pr-2">
                        <div
                          className="text-xl lg:text-2xl font-bold text-dark-brown mb-1"
                          style={{ fontVariantNumeric: 'lining-nums' }}
                        >
                          {event.time}
                        </div>
                        <div className="text-base lg:text-lg font-light text-gray-600">
                          {t(event.key)}
                        </div>
                      </div>

                      {/* Center: Branch line */}
                      <div className="w-8 lg:w-12 border-t-2 border-stone-800" />

                      {/* Right side: Icon */}
                      <div className="flex justify-start pl-2">
                        <div className="animate-gentle-float">
                          <Icon />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                // Odd index: Icon on left, content on right (on desktop) / Center on mobile
                return (
                  <div key={index} className="relative">
                    {/* Mobile: Centered layout */}
                    <div className="md:hidden flex flex-col items-center gap-3 text-center">
                      <div className="animate-gentle-float">
                        <Icon />
                      </div>
                      <div
                        className="text-lg sm:text-xl font-bold text-dark-brown mb-1"
                        style={{ fontVariantNumeric: 'lining-nums' }}
                      >
                        {event.time}
                      </div>
                      <div className="text-sm sm:text-base font-light text-gray-600">
                        {t(event.key)}
                      </div>
                    </div>

                    {/* Desktop: Grid layout */}
                    <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-center">
                      {/* Left side: Icon */}
                      <div className="flex justify-end pr-2">
                        <div className="animate-gentle-float">
                          <Icon />
                        </div>
                      </div>

                      {/* Center: Branch line */}
                      <div className="w-8 lg:w-12 border-t-2 border-stone-800" />

                      {/* Right side: Time and Event Name */}
                      <div className="text-left pl-2">
                        <div
                          className="text-xl lg:text-2xl font-bold text-dark-brown mb-1"
                          style={{ fontVariantNumeric: 'lining-nums' }}
                        >
                          {event.time}
                        </div>
                        <div className="text-base lg:text-lg font-light text-gray-600">
                          {t(event.key)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
