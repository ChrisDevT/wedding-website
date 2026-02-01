import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es' | 'uk';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    header: {
      title: 'You are invited to celebrate our wedding',
      subtitle: 'Wedding Celebration',
      date: 'May 30th, 2026',
      location: 'Málaga, Spain',
      names: 'Bride & Groom'
    },
    countdown: {
      title: 'Countdown to Our Special Day',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    },
    wesaidyes: {
      subtitle: 'We are glad to invite you to share the most special day of our lives.'
    },
    locations: {
      title: 'Where & When',
      ceremony: 'Ceremony',
      reception: 'Reception',
      viewMap: 'View on Maps',
      ceremonyDesc: 'Join us for our ceremony at this historic church in the heart of Málaga.',
      receptionDesc: 'Celebrate with us at this beautiful venue in the countryside of Málaga.'
    },
    accommodation: {
      title: 'Where to Stay',
      subtitle: 'Recommended areas near the venue',
      churriana: 'Churriana',
      guadalmar: 'Guadalmar',
      torremolinos: 'Torremolinos',
      carretera: 'Carretera de Cádiz',
      imperio: 'Martin Carpena',
      centro: 'Málaga Centro',
      helpText: 'Please, reach out to us if you have any doubts and we\'ll happily assist you with your accommodation'
    },
    schedule: {
      title: 'Wedding Timeline',
      ceremony: 'Ceremony',
      reception: 'Reception & Welcome Cocktail',
      entrada: 'Grand Entrance',
      comida: 'Dinner',
      fiesta: 'Party Time'
    },
    rsvp: {
      title: 'Confirm Your Attendance',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone (optional)',
      attending: 'Will you be attending?',
      yes: 'Yes, I will attend',
      no: 'Sorry, I cannot attend',
      plusOne: 'Will you bring a plus one?',
      plusOneName: 'Plus one name',
      dietary: 'Dietary Restrictions / Allergies',
      message: 'Message for the couple (optional)',
      submit: 'Submit RSVP',
      success: 'Thank you for your RSVP!',
      error: 'There was an error submitting your RSVP. Please try again.'
    },
    photos: {
      title: 'Share Your Photos',
      subtitle: 'Upload your favorite moments from our special day',
      yourName: 'Your Name',
      caption: 'Caption (optional)',
      selectFile: 'Select Photo',
      upload: 'Upload Photo',
      uploading: 'Uploading...',
      success: 'Photo uploaded successfully!',
      error: 'Error uploading photo. Please try again.',
      gallery: 'Photo Gallery',
      noPhotos: 'No photos yet. Be the first to share!'
    },
    quote: {
      text: 'Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.',
      author: 'Maya Angelou'
    },
    admin: {
      title: 'Admin Dashboard',
      password: 'Admin Password',
      login: 'Login',
      logout: 'Logout',
      totalRsvps: 'Total RSVPs',
      attending: 'Attending',
      notAttending: 'Not Attending',
      plusOnes: 'Plus Ones',
      downloadCsv: 'Download CSV',
      rsvpList: 'RSVP List',
      photos: 'Manage Photos',
      deletePhoto: 'Delete',
      noRsvps: 'No RSVPs yet'
    }
  },
  es: {
    header: {
      title: 'Estás invitado a celebrar nuestra boda',
      subtitle: 'El día de nuestra boda',
      date: '30 de Mayo de 2026',
      location: 'Málaga, España',
      names: 'Novia & Novio'
    },
    countdown: {
      title: 'Cuenta Regresiva para Nuestro Día Especial',
      days: 'Días',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos'
    },
    wesaidyes: {
      subtitle: 'Nos complace invitarte a compartir el día más especial de nuestras vidas'
    },
    locations: {
      title: 'Dónde y Cuándo',
      ceremony: 'Ceremonia',
      reception: 'Recepción',
      viewMap: 'Ver en Mapas',
      ceremonyDesc: 'Acompáñanos a nuestra ceremonia en esta histórica iglesia en el corazón de Málaga.',
      receptionDesc: 'Celebra con nosotros en este hermoso lugar en el campo de Málaga.'
    },
    accommodation: {
      title: 'Dónde Alojarse',
      subtitle: 'Áreas recomendadas cerca del lugar',
      churriana: 'Churriana',
      guadalmar: 'Guadalmar',
      torremolinos: 'Torremolinos',
      carretera: 'Carretera de Cádiz',
      imperio: 'Martin Carpena',
      centro: 'Málaga Centro',
      helpText: 'Antes de reservar, envíanos un mensaje si tienes dudas y te ayudaremos encantados'
    },
    schedule: {
      title: 'Cronograma de la Boda',
      ceremony: 'Ceremonia',
      reception: 'Recepción y Cóctel de Bienvenida',
      entrada: 'Entrada de los Novios',
      comida: 'Comida',
      fiesta: 'Fiesta'
    },
    rsvp: {
      title: 'Confirma tu Asistencia',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Teléfono (opcional)',
      attending: '¿Asistirás?',
      yes: 'Sí, asistiré',
      no: 'Lo siento, no puedo asistir',
      plusOne: '¿Traerás un acompañante?',
      plusOneName: 'Nombre del acompañante',
      dietary: 'Restricciones Dietéticas / Alergias',
      message: 'Mensaje para la pareja (opcional)',
      submit: 'Enviar Confirmación',
      success: '¡Gracias por tu confirmación!',
      error: 'Hubo un error al enviar tu confirmación. Por favor, inténtalo de nuevo.'
    },
    photos: {
      title: 'Comparte tus Fotos',
      subtitle: 'Sube tus momentos favoritos de nuestro día especial',
      yourName: 'Tu Nombre',
      caption: 'Descripción (opcional)',
      selectFile: 'Seleccionar Foto',
      upload: 'Subir Foto',
      uploading: 'Subiendo...',
      success: '¡Foto subida exitosamente!',
      error: 'Error al subir la foto. Por favor, inténtalo de nuevo.',
      gallery: 'Galería de Fotos',
      noPhotos: '¡Aún no hay fotos. Sé el primero en compartir!'
    },
    quote: {
      text: 'El amor no reconoce barreras. Salta obstáculos, cruza vallas, penetra muros para llegar a su destino lleno de esperanza.',
      author: 'Maya Angelou'
    },
    admin: {
      title: 'Panel de Administración',
      password: 'Contraseña de Administrador',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      totalRsvps: 'Total de Confirmaciones',
      attending: 'Asistirán',
      notAttending: 'No Asistirán',
      plusOnes: 'Acompañantes',
      downloadCsv: 'Descargar CSV',
      rsvpList: 'Lista de Confirmaciones',
      photos: 'Gestionar Fotos',
      deletePhoto: 'Eliminar',
      noRsvps: 'Aún no hay confirmaciones'
    }
  },
  uk: {
    header: {
      title: 'Запрошуємо вас на наше весілля',
      subtitle: 'Святкування весілля',
      date: '30 травня 2026',
      location: 'Малага, Іспанія',
      names: 'Наречена та Наречений'
    },
    countdown: {
      title: 'Зворотний відлік до нашого особливого дня',
      days: 'Днів',
      hours: 'Годин',
      minutes: 'Хвилин',
      seconds: 'Секунд'
    },
    wesaidyes: {
      subtitle: 'Ми раді запросити вас розділити найособливіший день нашого життя.'
    },
    locations: {
      title: 'Де і Коли',
      ceremony: 'Церемонія',
      reception: 'Банкет',
      viewMap: 'Переглянути на карті',
      ceremonyDesc: 'Приєднуйтесь до нашої церемонії в цій історичній церкві в серці Малаги.',
      receptionDesc: 'Святкуйте з нами в цьому чудовому місці в сільській місцевості Малаги.'
    },
    accommodation: {
      title: 'Де зупинитися',
      subtitle: 'Рекомендовані райони поблизу місця проведення',
      churriana: 'Чурріана',
      guadalmar: 'Гуадальмар',
      torremolinos: 'Торремолінос',
      carretera: 'Каретера де Кадіс',
      imperio: 'Мартін Карпена',
      centro: 'Центр Малаги',
      helpText: 'Будь ласка, зверніться до нас, якщо у вас є питання, і ми з радістю допоможемо з розміщенням'
    },
    schedule: {
      title: 'Розклад весілля',
      ceremony: 'Церемонія',
      reception: 'Банкет та вітальний коктейль',
      entrada: 'Урочистий вхід',
      comida: 'Вечеря',
      fiesta: 'Вечірка'
    },
    rsvp: {
      title: 'Підтвердіть свою присутність',
      name: 'Повне ім\'я',
      email: 'Електронна пошта',
      phone: 'Телефон (необов\'язково)',
      attending: 'Чи будете ви присутні?',
      yes: 'Так, я буду',
      no: 'На жаль, не зможу бути',
      plusOne: 'Чи візьмете з собою когось?',
      plusOneName: 'Ім\'я супутника',
      dietary: 'Дієтичні обмеження / Алергії',
      message: 'Повідомлення для молодят (необов\'язково)',
      submit: 'Надіслати підтвердження',
      success: 'Дякуємо за ваше підтвердження!',
      error: 'Виникла помилка. Будь ласка, спробуйте ще раз.'
    },
    photos: {
      title: 'Поділіться своїми фото',
      subtitle: 'Завантажте ваші улюблені моменти з нашого особливого дня',
      yourName: 'Ваше ім\'я',
      caption: 'Опис (необов\'язково)',
      selectFile: 'Вибрати фото',
      upload: 'Завантажити фото',
      uploading: 'Завантаження...',
      success: 'Фото успішно завантажено!',
      error: 'Помилка завантаження. Будь ласка, спробуйте ще раз.',
      gallery: 'Фотогалерея',
      noPhotos: 'Ще немає фото. Будьте першими!'
    },
    quote: {
      text: 'Любов не визнає бар\'єрів. Вона долає перешкоди, перестрибує огорожі, проникає крізь стіни, щоб досягти своєї мети, сповненої надії.',
      author: 'Мая Анжелу'
    },
    admin: {
      title: 'Панель адміністратора',
      password: 'Пароль адміністратора',
      login: 'Увійти',
      logout: 'Вийти',
      totalRsvps: 'Всього підтверджень',
      attending: 'Будуть присутні',
      notAttending: 'Не будуть присутні',
      plusOnes: 'Супутники',
      downloadCsv: 'Завантажити CSV',
      rsvpList: 'Список підтверджень',
      photos: 'Керувати фото',
      deletePhoto: 'Видалити',
      noRsvps: 'Ще немає підтверджень'
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
