// src/app/i18n.ts
import { createI18n } from 'vue-i18n';



const messages = {
  en: {
    misc: {
      language: 'Language',
      search: 'Search',
      selectOption: 'Select an option...',
      logout: 'Logout',
    },
  },
  es: {
    misc: {
      language: 'Idioma',
      search: 'Buscar',
      selectOption: 'Seleccione una opción...',
      logout: 'Cerrar Sesión',
    },
  },
};

// Función para obtener el idioma predeterminado
const getDefaultLocale = (): string => {
  const browserLocale = navigator.language;

  if (browserLocale.startsWith('es')) {
    return 'es';
  } else {
    return 'en';
  }
};

// Crear la instancia de i18n
const i18n = createI18n({
  locale: localStorage.getItem('user-locale') || getDefaultLocale(),
  fallbackLocale: 'en',
  messages,
});

export default i18n;
