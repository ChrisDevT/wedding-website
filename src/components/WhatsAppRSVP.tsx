import { useLanguage } from '../contexts/LanguageContext';

export function WhatsAppRSVP() {
  const { language } = useLanguage();

  const text = {
    en: {
      title: 'Confirm Your Attendance',
      subtitle: 'We can\'t wait to celebrate with you!',
      message: 'Please let us know if you\'ll be joining us on our special day. Just send us a WhatsApp message confirming your attendance and letting us know if you have any food allergies or dietary requirements.',
      button: 'Confirm via WhatsApp',
      allergies: 'Don\'t forget to mention any allergies or dietary needs!',
      deadline: 'Please confirm before April 30th, 2026',
    },
    es: {
      title: 'Confirma tu Asistencia',
      subtitle: '¡Estamos deseando celebrarlo con vosotros!',
      message: 'Por favor, envíanos un mensaje de WhatsApp confirmando tu asistencia y haznos saber si tienes alguna alergia alimentaria o requisito dietético.',
      button: 'Confirmar por WhatsApp',
      allergies: '¡No olvides indicarnos si tienes alguna alergia o necesidad alimentaria!',
      deadline: 'Por favor, confirma antes del 30 de abril de 2026',
    },
    uk: {
      title: 'Підтвердіть свою присутність',
      subtitle: 'Ми з нетерпінням чекаємо на святкування з вами!',
      message: 'Будь ласка, надішліть нам повідомлення в WhatsApp, щоб підтвердити свою присутність, і повідомте нас, якщо у вас є харчова алергія або дієтичні вимоги.',
      button: 'Підтвердити через WhatsApp',
      allergies: 'Не забудьте вказати, чи є у вас алергія або дієтичні потреби!',
      deadline: 'Будь ласка, підтвердіть до 30 квітня 2026 року',
    },
  };

  const t = text[language as 'en' | 'es' | 'uk'];

  const whatsappMessage = {
    en: 'Hi! I\'d like to confirm my attendance to Tatiana & Christian\'s wedding on May 30th. \n\nName: \nNumber of guests: \nAllergies/dietary needs: ',
    es: '¡Hola! Me gustaría confirmar mi asistencia a la boda de Tatiana y Christian el 30 de mayo. \n\nNombre: \nNúmero de invitados: \nAlergias/necesidades alimentarias: ',
    uk: 'Привіт! Я хочу підтвердити свою присутність на весіллі Тетяни та Крістіана 30 травня. \n\nІм\'я: \nКількість гостей: \nАлергії/дієтичні потреби: ',
  };

  const phoneNumber = '34600000000'; // Replace with actual phone number
  const message = encodeURIComponent(whatsappMessage[language as 'en' | 'es' | 'uk']);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <section id="rsvp" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-paper relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-charcoal tracking-wide mb-6 sm:mb-8">
          {t.title}
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl font-light text-charcoal/70 mb-8 sm:mb-10 italic">
          {t.subtitle}
        </p>

        {/* Message */}
        <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
          {t.message}
        </p>

        {/* Allergies reminder */}
        <div className="bg-bronze/5 border border-bronze/20 rounded-lg px-6 py-4 mb-8 sm:mb-10 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bronze">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-sm sm:text-base text-charcoal/70 font-medium">
              {t.allergies}
            </p>
          </div>
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t.button}
        </a>

        {/* Deadline */}
        <p className="mt-8 sm:mt-10 text-sm sm:text-base text-charcoal/50 font-mono tracking-wider uppercase">
          {t.deadline}
        </p>
      </div>
    </section>
  );
}
