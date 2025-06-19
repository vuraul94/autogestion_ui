import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Base/Table',
  argTypes: {
    sortable: {
      control: 'boolean',
      description: 'Enable/disable sorting for the table columns',
    },
    sortableColumns: {
      control: 'object',
      description: 'Array of booleans to control which columns are sortable',
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  setup() {
    const tableRows = [
      ['3728', '111111263', 'Jorge Trejos Castro', '29/07/2024', '29/07/2024', '29/07/2024', '0.00', '<button class="btn--main">Aprobar</button>'],
      ['3729', '111111264', 'Marcia del Castillo', '30/07/2024', '30/07/2024', '30/07/2024', '1.50', '<button class="btn--main">Aprobar</button>'],
      ['3730', '111111265', 'Raúl Venegas Ugalde', '01/08/2024', '01/08/2024', '01/08/2024', '2', '<button class="btn--main">Aprobar</button>'],
    ];

    const headers = [
      'No. Solicitud',
      'Identificación',
      'Nombre',
      'Registro',
      'Inicio',
      'Final',
      'Solicitados',
      '',
    ];

    return { args, headers, tableRows };
  },
  template: `
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in tableRows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex"  :data-label="headers[cellIndex]" v-html="cell"></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  sortable: true, // Habilitar el ordenamiento por defecto
  sortableColumns: [true, true, true, true, true, true, false, false], // Solo algunas columnas son ordenables
};
