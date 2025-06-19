import DropdownGrid from './dropdown-grid.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/DropdownGrid',
  component: DropdownGrid,
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon used in the dropdown',
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
    defaultValue: {
      control: 'text',
      description: 'Default value that is selected when the component mounts',
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { DropdownGrid },
  setup() {
    return { args };
  },
  template: `
    <DropdownGrid v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  //icon: 'fas fa-bars', // FontAwesome icon example
  modelValue: '',
  placeholder: 'Choose an option',
  keys: [{
    value: 'name',
    label: 'Nombre'
    },
    {
      value: 'employeeNumber',
      label: 'No. Empleado'
    },
    {
      value: 'identification',
      label: 'Identificacion'
    }
  ],
  options: [
    { value: '2323',
      columns: [{
        name: 'name',
        value: 'Jonh Doe'
      },
      {
        name: 'employeeNumber',
        value: '2323'
      },
      {
        name: 'identification',
        value: '001'
      }],
    },
    { value: '2324',
      columns: [{
        name: 'name',
          value: 'Raul Castro'
        },
        {
          name: 'employeeNumber',
          value: '2324'
        },
        {
          name: 'identification',
          value: '002'
        }],
    },
    { value: '2325',
      columns: [{
        name: 'name',
        value: 'Anthony Marin'
        },
        {
          name: 'employeeNumber',
          value: '2325'
        },
        {
          name: 'identification',
          value: '003'
        }],
    },
    { value: '2326',
      columns: [{
        name: 'name',
        value: 'Jonh Doe'
      },
        {
          name: 'employeeNumber',
          value: '2326'
        },
        {
          name: 'identification',
          value: '001'
        }],
    },
    { value: '2327',
      columns: [{
        name: 'name',
        value: 'Raul Castro'
      },
        {
          name: 'employeeNumber',
          value: '2327'
        },
        {
          name: 'identification',
          value: '002'
        }],
    },
    { value: '2328',
      columns: [{
        name: 'name',
        value: 'Anthony Marin'
      },
        {
          name: 'employeeNumber',
          value: '2328'
        },
        {
          name: 'identification',
          value: '003'
        }],
    },
    { value: '2329',
      columns: [{
        name: 'name',
        value: 'Jonh Doe'
      },
        {
          name: 'employeeNumber',
          value: '2329'
        },
        {
          name: 'identification',
          value: '001'
        }],
    },
    { value: '2330',
      columns: [{
        name: 'name',
        value: 'Raul Castro'
      },
        {
          name: 'employeeNumber',
          value: '2330'
        },
        {
          name: 'identification',
          value: '002'
        }],
    },
    { value: '2331',
      columns: [{
        name: 'name',
        value: 'Anthony Marin'
      },
        {
          name: 'employeeNumber',
          value: '2331'
        },
        {
          name: 'identification',
          value: '003'
        }],
    }
  ],
};
