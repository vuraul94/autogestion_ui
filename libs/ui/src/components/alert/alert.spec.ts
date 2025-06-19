import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AlertComponent from './alert.vue'
describe('AlertComponent', () => {
  it('should render success alert by default', () => {
    const wrapper = mount(AlertComponent, {
      global: {
        stubs: {
          FontAwesomeIcon: true, // Simula el componente FontAwesomeIcon
        },
      },
    });

    // Verificar que la clase de éxito se aplica correctamente
    expect(wrapper.classes()).toContain('alert--success');

    // Verificar que el título y contenido por defecto están presentes
    expect(wrapper.text()).toContain('Toast title');
    expect(wrapper.text()).toContain('Toast message here');
  });

  it('should render alert type error with the corresponding class', () => {
    const wrapper = mount(AlertComponent, {
      props: {
        type: 'error',
      },
      global: {
        stubs: {
          FontAwesomeIcon: true, // Simula el componente FontAwesomeIcon
        },
      },
    });

    // Verificar que la clase de error se aplica correctamente
    expect(wrapper.classes()).toContain('alert--error');
  });

  it('should render alert type warning with the corresponding class', () => {
    const wrapper = mount(AlertComponent, {
      props: {
        type: 'warning',
      },
      global: {
        stubs: {
          FontAwesomeIcon: true, // Simula el componente FontAwesomeIcon
        },
      },
    });

    // Verificar que la clase de advertencia se aplica correctamente
    expect(wrapper.classes()).toContain('alert--warning');
  });

  it('should render alert type success when incorrect class is passed', () => {
    const wrapper = mount(AlertComponent, {
      props: {
        type: 'test',
      },
      global: {
        stubs: {
          FontAwesomeIcon: true, // Simula el componente FontAwesomeIcon
        },
      },
    });

    // Verificar que la clase de advertencia se aplica correctamente
    expect(wrapper.classes()).toContain('alert--success');
  });

  it('should render alert type info with the corresponding class', () => {
    const wrapper = mount(AlertComponent, {
      props: {
        type: 'info',
      },
      global: {
        stubs: {
          FontAwesomeIcon: true, // Simula el componente FontAwesomeIcon
        },
      },
    });

    // Verificar que la clase de información se aplica correctamente
    expect(wrapper.classes()).toContain('alert--info');
  });

  it('should apply outline style when isOutline is true', () => {
    const wrapper = mount(AlertComponent, {
      props: {
        isOutline: true,
        type: 'success',
      },
      global: {
        stubs: {
          FontAwesomeIcon: true, // Simula el componente FontAwesomeIcon
        },
      },
    });

    // Verificar que se aplica la clase outline correctamente
    expect(wrapper.classes()).toContain('alert--outline');
    expect(wrapper.classes()).toContain('alert--success');
  });

  it('should hide the alert when the close button is clicked', async () => {
    const setShowMessage = vi.fn();
    const wrapper = mount(AlertComponent, {
      props: {
        setShowMessage,
      },
      global: {
        stubs: {
          FontAwesomeIcon: true, // Simula el componente FontAwesomeIcon
        },
      },
    });

    // Verificar si el botón de cerrar está presente en el DOM
    const closeButton = wrapper.find('.alert__close');
    expect(closeButton.exists()).toBe(true);

    // Simular clic en el botón de cerrar
    await closeButton.trigger('click');

    // Verificar que la función setShowMessage fue llamada para ocultar la alerta
    expect(setShowMessage).toHaveBeenCalledWith(false);
  });

  it('should render title and custom content', () => {
    const wrapper = mount(AlertComponent, {
      props: {
        title: 'Custom Title',
        content: 'Custom Content',
      },
      global: {
        stubs: {
          FontAwesomeIcon: true, // Simula el componente FontAwesomeIcon
        },
      },
    });

    // Verificar que el título y contenido personalizados se muestran correctamente
    expect(wrapper.text()).toContain('Custom Title');
    expect(wrapper.text()).toContain('Custom Content');
  });
});
