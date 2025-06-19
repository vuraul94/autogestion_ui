import DropdownCard from './dropdown-card.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

export default {
  title: 'Components/Cards/DropdownCard',
  component: DropdownCard,
  parameters: {
    docs: {
      description: {
        component: `Este componente sirve para crear una card que funciona como dropdown en mobile, con un header con titulo e icono, y un contenido organizado en secciones, cada una con un titulo y contenido`,
      },
    },
  },
  argTypes: {
    title: {
      control:'text',
    },
    sections: {
      control:'object',
    },
    icon: {
      control:'object',
    },
    buttonText: {
      control:'text'
    }
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { DropdownCard, FontAwesomeIcon },
  setup() {
    return { args };
  },
  template: `
    <DropdownCard v-bind="args"></DropdownCard>
  `,
});

export const Primary = Template.bind({});
Primary.args = {

  title: 'Persona',
  icon: ['fas', 'user'],
  sections: [
    { title: 'Puesto', content: 'Charlene Reed ' },
    { title: 'Salario Base', content: '897,580.74' },
    { title: 'Horario', content: 'Tiempo Completo' },
  ],
  link: '/persona',
};



