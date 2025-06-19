import SalaryCard from './salary-card.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

export default {
  title: 'Components/Cards/SalaryCard',
  component: SalaryCard,
  parameters: {
    docs: {
      description: {
        component: `Este componente sirve para crear una card con informacion de un salario en la vista "Mis salarios"`,
      },
    },
  },
  argTypes: {
    nominaId: {
      control:'number',
    },
    currency: {
      control: 'select', options: ['Colones', 'Dólares']
    },
    startDate: {
      control:'text',
    },
    endDate: {
      control:'text',
    },
    docLink: {
      control:'text',
    },
    tipoNominaId: {
      control:'number',
    }

  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { SalaryCard, FontAwesomeIcon },
  setup() {
    return { args };
  },
  template: `
    <SalaryCard v-bind="args"></SalaryCard>
  `,
});

export const Colones = Template.bind({});
Colones.args = {
  currency: 'Colones',
  salaryId: 10,
  startDate: '16/02/2024',
  endDate:'29/02/2024',
  docLink: '/ruta-a-mi-doc',
  labels: {
    period: 'Periodo',
    download: 'Descargar',
    seeMore: 'Ver Más'
  }
};
export const Dollars = Template.bind({});
Dollars.args = {
  currency: 'Dólares',
  salaryId: 11,
  startDate: '16/02/2024',
  endDate:'29/02/2024',
  docLink: '/ruta-a-mi-doc',
  labels: {
    period: 'Periodo',
    download: 'Descargar',
    seeMore: 'Ver Más'
  }
};



