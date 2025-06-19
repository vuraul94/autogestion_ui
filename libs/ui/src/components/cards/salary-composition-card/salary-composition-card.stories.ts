import SalaryCompositionCard from './salary-composition-card.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

export default {
  title: 'Components/Cards/SalaryCompositionCard',
  component: SalaryCompositionCard,
  parameters: {
    docs: {
      description: {
        component: `Este componente sirve para crear una card con información de la composición de un salario`,
      },
    },
  },
  argTypes: {
    concept: {
      control:'text',
    },
    currency: {
      control:'text',
    },
    percent: {
      control:'number',
    },
    unit: {
      control: 'select', options: ['Colones', 'Dólares']
    },
    value: {
      control:'number',
    },
    icon: {
      control:'object',
    },
    type: {
      control: 'select', options: ['main', 'dark-2']
    }

  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { SalaryCompositionCard, FontAwesomeIcon },
  setup() {
    return { args };
  },
  template: `
    <SalaryCompositionCard v-bind="args"></SalaryCompositionCard>
  `,
});

export const Main = Template.bind({});
Main.args = {
  type: 'main',
  concept: 'Salario Base Contrato',
  currency: 'Colones',
  percent: 100,
  unit: 'Mensual',
  value: 100000,
  labels: {
    concept: 'Concepto',
    currency: 'Moneda',
    percent: 'Porcentaje',
    unit: 'Unidad de Pago',
    value: 'Valor',
  }
};
export const Dark = Template.bind({});
Dark.args = {
  type: 'dark-2',
  concept: 'Salario Base Contrato',
  currency: 'Colones',
  percent: 100,
  unit: 'Mensual',
  value: 100000,
  labels: {
    concept: 'Concepto',
    currency: 'Moneda',
    percent: 'Porcentaje',
    unit: 'Unidad de Pago',
    value: 'Valor',
  }
};



