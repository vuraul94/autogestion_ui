import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Base/Inputs',
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Deshabilitar el input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder del input',
    },
  },
} as Meta;

// Plantilla base para los inputs
const Template: StoryFn = (args) => ({
  setup() {
    return { args };
  },
  template: `
    <div>
      <label>{{ args.label }}</label>
      <input v-bind="args" />
    </div>
  `,
});

export const TextInput = Template.bind({});
TextInput.args = {
  type: 'text',
  placeholder: 'Enter text',
  disabled: false,
  label: 'Text Input',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: 'password',
  placeholder: 'Enter password',
  disabled: false,
  label: 'Password Input',
};

export const DateInput = Template.bind({});
DateInput.args = {
  type: 'date',
  disabled: false,
  label: 'Date Input',
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  type: 'number',
  placeholder: 'Enter a number',
  disabled: false,
  label: 'Number Input',
};
