import type { Meta, StoryObj } from '@storybook/vue3';
import InputPassword from './InputPassword.vue';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// Definición del Meta para el componente InputPassword
const meta: Meta<typeof InputPassword> = {
  component: InputPassword,
  title: 'Components/InputPassword',
  args: {
    placeholder: 'Enter your password',
    disabled: false,
    required: false,
    name:'name'
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// Historia principal (Primary) con valores por defecto
export const Primary: Story = {
  args: {},
};

// Historia con prueba para verificar el contenido
export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verifica si el placeholder está presente
    await expect(canvas.getByPlaceholderText(/Enter your password/gi)).toBeTruthy();
  },
};
