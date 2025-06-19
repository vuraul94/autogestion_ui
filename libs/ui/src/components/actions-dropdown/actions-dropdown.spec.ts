import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import DropdownComponent from './actions-dropdown.vue'

describe('DropdownComponent', () => {
  it('should render the default label', () => {
    const wrapper = mount(DropdownComponent, {
      props: {
        actions: [],
      },
    });
    expect(wrapper.text()).toContain('Actions');
  });

  it('should show the actions when the dropdown is open', async () => {
    const actions = [{ label: 'Action 1', clickHandler: vi.fn() }];
    const wrapper = mount(DropdownComponent, {
      props: {
        actions,
      },
    });

    // Verificar que el dropdown está cerrado inicialmente
    expect(wrapper.find('ul').exists()).toBe(false);

    // Simular click en el botón para abrir el dropdown
    await wrapper.find('button').trigger('click');

    // Verificar que el dropdown está abierto y contiene la acción
    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.text()).toContain('Action 1');
  });

  it('should close the dropdown after clicking an action with clickHandler', async () => {
    const clickHandler = vi.fn();
    const actions = [{ label: 'Action 1', clickHandler }];
    const wrapper = mount(DropdownComponent, {
      props: {
        actions,
      },
    });

    // Abrir el dropdown
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(true);

    // Hacer clic en la acción
    await wrapper.find('button.block').trigger('click');

    // Verificar que el clickHandler se ha llamado
    expect(clickHandler).toHaveBeenCalled();

    // Verificar que el dropdown se ha cerrado
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('should render correctly a link instead of a button if "href" is given', async () => {
    const actions = [{ label: 'Action 1', href: 'https://example.com' }];
    const wrapper = mount(DropdownComponent, {
      props: {
        actions,
      },
    });

    // Abrir el dropdown
    await wrapper.find('button').trigger('click');
    
    // Verificar que se renderiza un enlace <a> en lugar de un botón
    const link = wrapper.find('a');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe('https://example.com');
  });

  it('should toggle dropdown open and close when clicking the button', async () => {
    const wrapper = mount(DropdownComponent, {
      props: {
        actions: [],
      },
    });

    // Verificar que el dropdown está cerrado inicialmente
    expect(wrapper.find('ul').exists()).toBe(false);

    // Hacer clic para abrir el dropdown
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(true);

    // Hacer clic de nuevo para cerrar el dropdown
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(false);
  });
});
