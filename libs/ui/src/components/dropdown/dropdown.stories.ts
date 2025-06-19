import Dropdown from './dropdown.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon used in the dropdown',
    },
    iconType: {
      control: { type: 'select', options: ['html', 'image', 'fontawesome'] },
      description: 'Type of icon to display',
    },
    options: {
      control: 'object',
      description: 'Array of options with label and value',
    },
    modelValue: {
      control: 'text',
      description: 'The value selected in the dropdown',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when no option is selected',
    },
    value: {
      control: 'text',
      description: 'Default value that is selected when the component mounts',
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { Dropdown },
  setup() {
    return { args };
  },
  template: `
    <Dropdown v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  icon: 'fas fa-bars', // FontAwesome icon example
  iconType: 'fontawesome',
  modelValue: '',
  placeholder: 'Choose an option',
  options: [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ],
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  icon: 'fas fa-check-circle', // FontAwesome icon example
  iconType: 'fontawesome',
  modelValue: '',
  placeholder: 'Select an option',
  value: 'opt2', // Default value selected at mount
  options: [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ],
};

export const WithImageIcon = Template.bind({});
WithImageIcon.args = {
  icon: 'https://via.placeholder.com/24', // Image example
  iconType: 'image',
  modelValue: '',
  placeholder: 'Select an option',
  options: [
    { label: 'First', value: 'first' },
    { label: 'Second', value: 'second' },
    { label: 'Third', value: 'third' },
  ],
};

export const WithHtmlIcon = Template.bind({});
WithHtmlIcon.args = {
  icon: '<span>🔥</span>', // HTML example
  iconType: 'html',
  modelValue: '',
  placeholder: 'Pick an option',
  options: [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
    { label: 'Gamma', value: 'gamma' },
  ],
};


export const WithAlternativeKeys = Template.bind({});
WithAlternativeKeys.args = {
  icon: 'fas fa-check-circle', // FontAwesome icon example
  iconType: 'fontawesome',
  modelValue: '',
  placeholder: 'Select an option',
  value: '2', 
  labelKey: 'nombre',
  valueKey: 'valor',
  options: [
    { nombre: 'Opción 1', valor: '1' },
    { nombre: 'Opción 2', valor: '2' },
    { nombre: 'Opción 3', valor: '3' },
  ],
};