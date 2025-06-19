import JobCard from './job-card.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

export default {
  title: 'Components/Cards/JobCard',
  component: JobCard,
  parameters: {
    docs: {
      description: {
        component: `Este componente sirve para crear una card con informacion de un puesto de trabajo`,
      },
    },
  },
  argTypes: {
    name: {
      control:'text',
    },
    schedule: {
      control:'text',
    },
    state: {
      control:'text',
    },
    color: {
      control: 'select', options: ['main', 'dark-2']
    }

  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { JobCard, FontAwesomeIcon },
  setup() {
    return { args };
  },
  template: `
    <JobCard v-bind="args"></JobCard>
  `,
});

export const Main = Template.bind({});
Main.args = {
  color: 'main',
  name: 'Jefe de Sistemas Informáticos',
  state: 'Activo',
  schedule: 'CH, L-J, 7:30 - 4:30  V, 7:30 - 4:00',
  labels:{
    name: 'Puesto',
    state: 'Estado de Contrato',
    schedule: 'Horario Establecido',
  }
};
export const Dark = Template.bind({});
Dark.args = {
  name: 'Jefe de Sistemas Informáticos',
  state: 'Activo',
  schedule: 'CH, L-J, 7:30 - 4:30  V, 7:30 - 4:00',
  labels:{
    name: 'Puesto',
    state: 'Estado de Contrato',
    schedule: 'Horario Establecido',
  },
  color: 'dark-2'
};



