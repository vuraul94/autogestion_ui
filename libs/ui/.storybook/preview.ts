import '../src/styles/ui.scss';
import type { Preview } from "@storybook/vue3";
import { setup } from '@storybook/vue3';
import { createRouter, createWebHistory, RouterLink } from 'vue-router';
import { createPinia } from 'pinia'; 
import i18n from '../src/i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

// 🔹 Crear un router ficticio
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: {} }], 
});

// 🔹 Crear instancia de Pinia
const pinia = createPinia();

setup((app) => {
  app.use(i18n);
  app.use(router);
  app.use(pinia); 

  // 🔹 Simular RouterLink para evitar navegación real
  app.component('RouterLink', RouterLink);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
