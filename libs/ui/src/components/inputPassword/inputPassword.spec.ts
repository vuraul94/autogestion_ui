import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import PasswordInput from './inputPassword.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

describe('PasswordInput.vue', () => {
  it('renders the input with the correct placeholder', () => {
    const wrapper = mount(PasswordInput, {
      global: {
        components: {
          FontAwesomeIcon,
        },
      },
      props: {
        placeholder: 'Enter your password',
      },
    });

    const input = wrapper.find('input');
    expect(input.element.placeholder).toBe('Enter your password');
  });

  it('renders the input as type "password" by default', () => {
    const wrapper = mount(PasswordInput, {
      global: {
        components: {
          FontAwesomeIcon,
        },
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('password');
  });

  it('toggles the password visibility when the button is clicked', async () => {
    const wrapper = mount(PasswordInput, {
      global: {
        components: {
          FontAwesomeIcon,
        },
      },
    });

    const button = wrapper.find('button');
    const input = wrapper.find('input');

    // Estado inicial (tipo password)
    expect(input.attributes('type')).toBe('password');

    // Hacer click en el botón
    await button.trigger('click');

    // Después del click, debería cambiar a tipo text
    expect(input.attributes('type')).toBe('text');

    // Hacer click de nuevo para esconder la contraseña
    await button.trigger('click');
    expect(input.attributes('type')).toBe('password');
  });

  it('passes down attributes correctly to the input element', () => {
    const wrapper = mount(PasswordInput, {
      global: {
        components: {
          FontAwesomeIcon,
        },
      },
      attrs: {
        disabled: true, 
        maxlength: '10',
      },
    });
  
    const input = wrapper.find('input');
    expect(input.attributes()).toHaveProperty('disabled');
    expect(input.attributes('maxlength')).toBe('10');
  });
  
});
