import FormattableDateField from './formattableDateField.vue'; // Asegúrate de que la ruta sea correcta
import { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

export default {
  title: 'Components/FormattableDateField',
  component: FormattableDateField,
  argTypes: {
    datePattern: {
      control: 'text',
      description: 'Patrón de formato de fecha (e.g., "dd/mm/yyyy", "mm/dd/yyyy")',
      defaultValue: 'd/m/Y',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder que muestra el formato de fecha',
      defaultValue: 'dd/mm/yyyy',
    },
  },
} as Meta<typeof FormattableDateField>;

const Template: StoryFn<typeof FormattableDateField> = (args) => ({
  components: { FormattableDateField },
  setup() {
    const selectedDate = ref(''); // El valor de la fecha seleccionada se vincula aquí

    return { args, selectedDate };
  },
  template: `
    <div>
      <FormattableDateField v-bind="args" v-model="selectedDate" />
      <p>Fecha seleccionada: {{ selectedDate }}</p>
    </div>
  `,
});


export const Default = Template.bind({});
Default.args = {
  datePattern: 'd/m/Y',
  placeholder: 'dd/mm/yyyy',
};

export const USFormat = Template.bind({});
USFormat.args = {
  datePattern: 'm/d/Y',
  placeholder: 'mm/dd/yyyy',
};

export const CustomFormat = Template.bind({});
CustomFormat.args = {
  datePattern: 'Y-m-d',
  placeholder: 'yyyy-mm-dd',
};

export const WithDateConsumption = Template.bind({});
WithDateConsumption.args = {
  datePattern: 'd/m/Y',
  placeholder: 'dd/mm/yyyy',
};
