import { useLanguage } from '../contexts/LanguageContext';

export function WhatsAppRSVP() {
  const { language } = useLanguage();

  const text = {
    en: {
      title: 'Confirm Your Attendance',
      subtitle: 'We can\'t wait to celebrate with you!',
      message: 'Please send us a WhatsApp to confirm your attendance and let us know the number of guests. If you have any food allergies or dietary requirements, don\'t forget to mention them too.',
      allergies: 'Please let us know about any allergies or dietary needs',
      deadline: 'Please confirm before April 30th, 2026',
    },
    es: {
      title: 'Confirma tu Asistencia',
      subtitle: '¡Estamos deseando celebrarlo con vosotros!',
      message: 'Envíanos un WhatsApp para confirmar tu asistencia e indicarnos el número de acompañantes. Si tienes alguna alergia alimentaria o necesidad dietética, no olvides mencionárnoslo.',
      allergies: 'Por favor, indícanos si tienes alguna alergia o necesidad alimentaria',
      deadline: 'Por favor, confirma antes del 30 de abril de 2026',
    },
    uk: {
      title: 'Підтвердіть присутність',
      subtitle: 'Ми з нетерпінням чекаємо на святкування з вами!',
      message: 'Будь ласка, надішліть нам повідомлення у WhatsApp, щоб підтвердити свою присутність та вказати кількість гостей. Якщо у вас є харчова алергія або дієтичні потреби, не забудьте повідомити нас.',
      allergies: 'Будь ласка, повідомте нас про алергії або дієтичні потреби',
      deadline: 'Будь ласка, підтвердіть до 30 квітня 2026 року',
    },
  };

  const t = text[language as 'en' | 'es' | 'uk'];

  return (
    <section id="rsvp" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-paper relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Decorative element */}
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
          <div className="h-px w-12 bg-bronze/30" />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-bronze/50">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <div className="h-px w-12 bg-bronze/30" />
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-charcoal tracking-wide mb-6 sm:mb-8">
          {t.title}
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl font-light text-charcoal/70 mb-10 sm:mb-12 italic">
          {t.subtitle}
        </p>

        {/* Message */}
        <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed mb-10 sm:mb-12 max-w-xl mx-auto">
          {t.message}
        </p>

        {/* Allergies reminder */}
        <div className="bg-bronze/5 border border-bronze/20 rounded-lg px-6 py-4 mb-10 sm:mb-12 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bronze flex-shrink-0">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-sm sm:text-base text-charcoal/70 font-medium">
              {t.allergies}
            </p>
          </div>
        </div>

        {/* Deadline */}
        <p className="text-sm sm:text-base text-charcoal/50 font-mono tracking-wider uppercase">
          {t.deadline}
        </p>
      </div>
    </section>
  );
}
