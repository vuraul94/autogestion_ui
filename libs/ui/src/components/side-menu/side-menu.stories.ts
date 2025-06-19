import SideMenu from './side-menu.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/SideMenu',
  component: SideMenu,
  argTypes: {
    links: {
      control: 'object',
      description: 'Lista de enlaces del menú con texto, icono y enlace.',
    },
    logoSrc: {
      control: 'text',
      description: 'Ruta de la imagen del logo superior.',
      defaultValue: '/src/images/logo-menu.svg', // Imagen de ejemplo para el logo superior
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
          El \`SideMenu\` es un componente de menú lateral que utiliza FontAwesome para mostrar íconos junto con texto.
          Puede colapsar o expandirse, y adaptarse a diferentes tamaños de pantalla.

          ### Props
          - **links**: Lista de enlaces del menú con texto, icono y enlace.
          - **logoSrc**: Ruta de la imagen del logo superior.
          - **smallLogoSrc**: Ruta de la imagen del logo en el menú colapsado.
          - **footerLogoSrc**: Ruta de la imagen del logo inferior.
        `,
      },
    },
  },
} as Meta<typeof SideMenu>;

const Template: StoryFn<typeof SideMenu> = (args) => ({
  components: { SideMenu },
  setup() {
    return { args };
  },
  template: '<SideMenu v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  logoSrc: '/src/images/logo-menu.svg',
  links: [
    { text: 'General', icon: ['fas', 'home'], route: '#', isActive: true },
    { text: 'Mi Perfil', icon: ['fas', 'user'], route: '#', isActive: false },
    { text: 'Acciones', icon: ['fas', 'clipboard'], route: '#', isActive: false },
    { text: 'Vacaciones', icon: ['fas', 'plane'], route: '#', isActive: false },
    { text: 'Permisos', icon: ['fas', 'calendar-check'], route: '#', isActive: false },
    { text: 'Salarios', icon: ['fas', 'money-bill'], route: '#', isActive: false },
    { text: 'Gestiones', icon: ['fas', 'tasks'], route: '#', isActive: false },
    { text: 'Tiempo', icon: ['fas', 'clock'], route: '#', isActive: false },
  ],
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  logoSrc: '/src/images/logo-menu.svg',
  links: [
    { text: 'General', icon: ['fas', 'home'], route: '#', isActive: true },
    { text: 'Mi Perfil', icon: ['fas', 'user'], route: '#', isActive: false },
    { text: 'Acciones', icon: ['fas', 'clipboard'], route: '#', isActive: false },
    { text: 'Vacaciones', icon: ['fas', 'plane'], route: '#', isActive: false },
    { text: 'Permisos', icon: ['fas', 'calendar-check'], route: '#', isActive: false },
    { text: 'Salarios', icon: ['fas', 'money-bill'], route: '#', isActive: false },
    { text: 'Gestiones', icon: ['fas', 'tasks'], route: '#', isActive: false },
    { text: 'Tiempo', icon: ['fas', 'clock'], route: '#', isActive: false },
  ],
};
