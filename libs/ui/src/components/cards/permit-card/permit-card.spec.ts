import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import PermitCard from './permit-card.vue';

describe('PermitCard Component', () => {

  // Verificar renderización básica
  it('should render with default props', () => {
    const wrapper = mount(PermitCard);
    expect(wrapper.text()).toContain('Jorge Trejos Castro');
    expect(wrapper.text()).toContain('3728');
    expect(wrapper.text()).toContain('111111263');
    expect(wrapper.text()).toContain('Solicitado');
    expect(wrapper.text()).toContain('29/07/2024');
    expect(wrapper.text()).toContain('2/08/2024');
    expect(wrapper.text()).toContain('Lorem Ipsum');
    expect(wrapper.text()).toContain('Pendiente');
    expect(wrapper.text()).toContain('Doc Lorem Ipsum');
    expect(wrapper.text()).toContain('00:00');
  });

  it('should render with custom props', () => {
    const wrapper = mount(PermitCard, {
      props: {
        name: 'Carlos Pérez',
        applicationNumber: 1234,
        id: 987654321,
        actionType: 'Aprobado',
        registrationDate: '01/01/2024',
        startDate: '01/01/2024',
        endDate: '05/01/2024',
        reason: 'Razón de prueba',
        state: 'Aprobado',
        doc: 'Documento de Prueba',
        time: '12:30'
      }
    });

    expect(wrapper.text()).toContain('Carlos Pérez');
    expect(wrapper.text()).toContain('1234');
    expect(wrapper.text()).toContain('987654321');
    expect(wrapper.text()).toContain('Aprobado');
    expect(wrapper.text()).toContain('01/01/2024');
    expect(wrapper.text()).toContain('05/01/2024');
    expect(wrapper.text()).toContain('Razón de prueba');
    expect(wrapper.text()).toContain('Aprobado');
    expect(wrapper.text()).toContain('Documento de Prueba');
    expect(wrapper.text()).toContain('12:30');
  });

  it('should manage undefined props', () => {
    const wrapper = mount(PermitCard, {
      props: {
        name: undefined,
        applicationNumber: undefined,
        id: undefined,
        actionType: undefined,
        registrationDate: undefined,
        startDate: undefined,
        endDate: undefined,
        reason: undefined,
        state: undefined,
        doc: undefined,
        time: undefined,
      }
    });

    expect(wrapper.text()).toContain('');
    expect(wrapper.text()).not.toContain('undefined');
    expect(wrapper.text()).not.toContain('null');
  });

  it('should render with missing props', () => {
    const wrapper = mount(PermitCard, {
      props: {
        name: 'Test User'
        // Missing other props
      }
    });

    expect(wrapper.text()).toContain('Test User');
    // not showing undefiend or null
    expect(wrapper.text()).not.toContain('undefined');
    expect(wrapper.text()).not.toContain('null');
  });

  it('should render when numeric props are incorrect', () => {
    const wrapper = mount(PermitCard, {
      props: {
        applicationNumber: 'no-numero', // Paso un string en lugar de un número
        id: 'no-id', // Paso un string en lugar de un número
        time: 'invalid-time' // Paso un valor incorrecto de tiempo
      }
    });

    expect(wrapper.text()).toContain('no-numero');
    expect(wrapper.text()).toContain('no-id');
    expect(wrapper.text()).toContain('invalid-time');
  });

  
  it('should render props with long content', () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula orci eu.';
    const wrapper = mount(PermitCard, {
      props: {
        reason: longText,
      }
    });

    expect(wrapper.text()).toContain(longText);
  });

  it('should render empty strings', () => {
    const wrapper = mount(PermitCard, {
      props: {
        name: '',
        reason: '', // Only empty strings
      }
    });

    expect(wrapper.text()).toContain('');
    expect(wrapper.text()).not.toContain('    '); //Not showing blank spaces
  });

  it('should render special characters in props', () => {
    const wrapper = mount(PermitCard, {
      props: {
        name: 'ñ%@@!@@""{{ reason }}',
        reason: 'Razón & Justificación'
      }
    });

    expect(wrapper.text()).toContain('ñ%@@!@@""{{ reason }}');
    expect(wrapper.text()).toContain('Razón & Justificación');
  });

});
