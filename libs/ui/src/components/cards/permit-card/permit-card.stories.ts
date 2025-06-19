import PermitCard from './permit-card.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

export default {
  title: 'Components/Cards/PermitCard',
  component: PermitCard,
  parameters: {
    docs: {
      description: {
        component: `Este componente sirve para crear una card con informacion sobre permisos solicitados`,
      },
    },
  },
  argTypes: {
    name: {
      control:'text',
    },
    applicationNumber: {
      control:'number',
    },
    id: {
      control:'text',
    },
    actionType: {
      control:'text',
    },
    registrationDate: {
      control:'text',
    },
    startDate: {
      control:'text',
    },
    endDate: {
      control:'text',
    },
    reason: {
      control:'text',
    },
    state: {
      control:'text',
    },
    doc: {
      control:'text',
    },
    time: {
      control:'text',
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { PermitCard, FontAwesomeIcon },
  setup() {
    return { args };
  },
  template: `
    <PermitCard v-bind="args"></PermitCard>
  `,
});

export const Main = Template.bind({});
Main.args = {
  name: 'Jorge Trejos Castro',
  applicationNumber: 3728,
  id: 111111263,
  actionType: 'Solicitado',
  registrationDate: '29/07/2024',
  startDate: '29/07/2024',
  endDate: '2/08/2024',
  reason: 'Lorem Ipsum',
  state: 'Pendiente',
  doc: 'Doc Lorem Ipsum',
  time: '00:00',
  labels: {
    name: 'Nombre Completo',
    applicationNumber: 'No. Solicitud',
    id: 'Identificación',
    actionType: 'Tipo de Acción',
    registrationDate: 'Registro',
    startDate: 'Inicio',
    endDate: 'Final',
    reason: 'Justificación',
    state: 'Estado',
    doc: 'Documento de Soporte',
    time: 'Tiempo',
  }
};




