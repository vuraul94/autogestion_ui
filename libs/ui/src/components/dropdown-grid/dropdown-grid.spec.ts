import { mount } from '@vue/test-utils';
import Dropdown from './dropdown.vue'; // Asegúrate de que la ruta sea correcta
import { nextTick } from 'vue';

describe('Dropdown.vue', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ];

  it('renders placeholder when no option is selected', () => {
    const wrapper = mount(Dropdown, {
      props: {
        options,
        icon: ['fas', 'fa-dollar-sign'],  // Cambiado a un array de dos strings
        iconType: 'fontawesome',
        value: undefined, // Omitimos el valor seleccionado
      }
    });
    expect(wrapper.text()).toContain('Seleccione una opción...');
  });

  it('toggles dropdown menu when button is clicked', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        options,
        icon: ['fas', 'fa-dollar-sign'],  // Cambiado a un array de dos strings
        iconType: 'fontawesome',
      }
    });
    expect(wrapper.find('.dropdown__menu-holder').exists()).toBe(false);

    // Abrir dropdown
    await wrapper.find('.select--main').trigger('click');
    expect(wrapper.find('.dropdown__menu-holder').exists()).toBe(true);

    // Cerrar dropdown
    await wrapper.find('.select--main').trigger('click');
    expect(wrapper.find('.dropdown__menu-holder').exists()).toBe(false);
  });

  it('selects an option and emits event', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        options,
        value: undefined, // No hay valor seleccionado al principio
        icon: ['fas', 'fa-dollar-sign'],  // Cambiado a un array de dos strings
        iconType: 'fontawesome'
      }
    });

    // Abrir dropdown
    await wrapper.find('.select--main').trigger('click');

    // Seleccionar la segunda opción válida (índice 2 en lugar de 1, porque el primer elemento es N/A)
    await wrapper.findAll('.dropdown__menu-item').at(2)?.trigger('click');

    // Verificar que el evento se haya emitido correctamente
    expect(wrapper.emitted('onOptionSelected')).toBeTruthy();
    expect(wrapper.emitted('onOptionSelected')?.[0]).toEqual([options[1]]); // Valor de la opción seleccionada
  });



  it('displays the selected option label', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        options,
        value: options[2], // Seleccionada la opción 3 (DropdownOption)
        icon: ['fas', 'fa-dollar-sign'],  // Cambiado a un array de dos strings
        iconType: 'fontawesome'
      }
    });

    expect(wrapper.text()).toContain('Option 3'); // La opción seleccionada debería mostrarse
  });

  it('deselects the option when "N/A" is clicked', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        options,
        value: options[1], // Valor inicial: Option 2 seleccionada
        icon: ['fas', 'fa-dollar-sign'],  // Cambiado a un array de dos strings
        iconType: 'fontawesome'
      }
    });

    // Abrir dropdown
    await wrapper.find('.select--main').trigger('click');
    // Seleccionar "N/A"
    await wrapper.findAll('.dropdown__menu-item').at(0)?.trigger('click'); // Primera opción es "N/A"

    // Verificar que el evento se haya emitido con `null`
    expect(wrapper.emitted('onOptionSelected')).toBeTruthy();
    expect(wrapper.emitted('onOptionSelected')?.[0]).toEqual([undefined]);
    expect(wrapper.text()).toContain('Seleccione una opción...');
  });

  it('renders the correct FontAwesome icon', () => {
    const wrapper = mount(Dropdown, {
      props: {
        options,
        icon: ['fas', 'fa-dollar-sign'],  // Cambiado a un array de dos strings
        iconType: 'fontawesome'
      }
    });

    // Verificar que el componente FontAwesome esté presente
    expect(wrapper.findComponent({ name: 'FontAwesomeIcon' }).exists()).toBe(true);
  });

  it('closes the dropdown when clicking outside', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        options,
        icon: ['fas', 'fa-dollar-sign'],  // Cambiado a un array de dos strings
        iconType: 'fontawesome',
      }
    });

    // Abrir dropdown
    await wrapper.find('.select--main').trigger('click');
    expect(wrapper.find('.dropdown__menu-holder').exists()).toBe(true);

    // Simular un clic fuera del componente en el documento
    await document.body.click();
    await nextTick(); // Esperar que el DOM se actualice

    expect(wrapper.find('.dropdown__menu-holder').exists()).toBe(false);
  });
});
