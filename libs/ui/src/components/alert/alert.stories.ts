import { Meta, StoryFn, StoryObj } from '@storybook/vue3';
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import Alert from './alert.vue';

export default {
  component: Alert,
  title: 'components/Alert',
  parameters: {
    docs: {
      description: {
        component: `Este componente sirve para brindar informacion al usuario del estado de sus solicitudes`,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
    isOutline: {
      control: 'boolean',
    },
    type: {
      control: 'select', options: ['success', 'error', 'info', 'warning']
    }
  }

  } as Meta;

const Template: StoryFn = (args) => ({
  components: { Alert, FontAwesomeIcon },
  setup() {
    return { args };
  },
  template: `
    <Alert v-bind="args"></Alert>
  `,
});

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  isOutline: false
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  isOutline: false
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  isOutline: false
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  isOutline: false
};

export const InfoOutline = Template.bind({});
InfoOutline.args = {
  type: 'info',
  isOutline: true
};

export const SuccessOutline = Template.bind({});
SuccessOutline.args = {
  type: 'success',
  isOutline: true
};

export const ErrorOutline = Template.bind({});
ErrorOutline.args = {
  type: 'error',
  isOutline: true
};

export const WarningOutline = Template.bind({});
WarningOutline.args = {
  type: 'warning',
  isOutline: true
};
