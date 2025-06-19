import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SalaryCompositionCard from './salary-composition-card.vue'

describe('SalaryCompositionCard Component', () => {
  
  it('should render default props', () => {
    const wrapper = mount(SalaryCompositionCard, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    expect(wrapper.text()).toContain('Salario Base Contrato');
    expect(wrapper.text()).toContain('Colones');
    expect(wrapper.text()).toContain('100.00');
    expect(wrapper.text()).toContain('100,000.00'); 
    expect(wrapper.text()).toContain('Mensual');

    const icon = wrapper.findComponent({ name: 'FontAwesomeIcon' });
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('icon-pill--main');
  });

  it('should format percentage and value', () => {
    const wrapper = mount(SalaryCompositionCard, {
      props: {
        percent: 50.256,
        value: 50000.75,
      },
    });

    expect(wrapper.text()).toContain('50.26'); 
    expect(wrapper.text()).toContain('50,000.75'); 
  });

  it('should reneder custom props', () => {
    const wrapper = mount(SalaryCompositionCard, {
      props: {
        concept: 'Salario Extraordinario',
        currency: 'Dólares',
        percent: 75.5,
        unit: 'Quincenal',
        value: 75000,
        type: 'dark-2',
      },
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    expect(wrapper.text()).toContain('Salario Extraordinario');
    expect(wrapper.text()).toContain('Dólares');
    expect(wrapper.text()).toContain('75.50');
    expect(wrapper.text()).toContain('75,000.00');
    expect(wrapper.text()).toContain('Quincenal');
    
    const icon = wrapper.findComponent({ name: 'FontAwesomeIcon' });
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('icon-pill--dark-2');
  });

  it('should manage null or undefined props', () => {
    const wrapper = mount(SalaryCompositionCard, {
      props: {
        concept: '',
        currency: undefined,
        percent: null,
        value: undefined,
      },
    });

    expect(wrapper.text()).toContain('');
  });

  it('should manage "weird" percentage', () => {
    const wrapper = mount(SalaryCompositionCard, {
      props: {
        percent: 200.5,
      },
    });

    expect(wrapper.text()).toContain('200.50');
  });

  it('should format high values', () => {
    const wrapper = mount(SalaryCompositionCard, {
      props: {
        value: 123456789.987,
      },
    });

    expect(wrapper.text()).toContain('123,456,789.99');
  });

  it('should render correct icon based on "icon" prop', () => {
    const wrapper = mount(SalaryCompositionCard, {
      props: {
        icon: ['fas', 'chart-bar'],
      },
    });

    const icon = wrapper.findComponent({ name: 'FontAwesomeIcon' });
    expect(icon.props('icon')).toEqual(['fas', 'chart-bar']);
  });

  it('should redner emtpy strings', () => {
    const wrapper = mount(SalaryCompositionCard, {
      props: {
        concept: '',
        currency: '',
        unit: '',
      },
    });

    expect(wrapper.text()).toContain('');
    expect(wrapper.text()).not.toContain('undefined');
  });
  it('should render the correct class based on card type', () => {
    const wrapper = mount(SalaryCompositionCard, {
      props: {
        type: 'dark-2',
      },
    });

    const subcard = wrapper.find('.py-2.px-6');
    expect(subcard.classes()).toContain('card--dark-2');
  });
});
