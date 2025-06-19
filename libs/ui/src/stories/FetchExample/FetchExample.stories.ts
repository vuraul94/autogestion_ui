import FetchExample from './FetchExample.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Hooks/FetchExample',
  component: FetchExample,
  parameters: {
    docs: {
      description: {
        component: `
          El componente **FetchExample** usa el hook \`useFetchData\` para realizar una solicitud GET a una URL específica y 
          mostrar los datos obtenidos en el formato JSON. Este componente muestra el estado de la carga, el mensaje de error en caso de que falle la solicitud, 
          y la respuesta JSON en caso de éxito.
          
          ### Propiedades
          - **URL**: La URL desde donde se realiza la solicitud, en este caso fija a \`https://mocki.io/v1/edc34442-49b3-45ea-b588-70e8a911dd6b\`.
          - **Hook**: Utiliza el hook \`useFetchData\`, el cual realiza la llamada y gestiona automáticamente los estados de \`loading\` y \`error\`.

        `,
      },
    },
  },
} as Meta<typeof FetchExample>;

const Template: StoryFn<typeof FetchExample> = () => ({
  components: { FetchExample },
  template: '<FetchExample />',
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      story: `
        La implementación por defecto del componente **FetchExample** hace una solicitud a una URL pública de ejemplo. 
        Puedes usar este componente en casos donde necesites mostrar datos obtenidos de un endpoint API, 
        mostrando el estado de carga y manejando errores de manera visual.
      `,
    },
  },
};
