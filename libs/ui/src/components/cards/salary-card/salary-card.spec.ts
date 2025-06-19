import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SalaryCard from './salary-card.vue'

describe('SalaryCard Component', () => {
  
  it('should render with default props', () => {
    const wrapper = mount(SalaryCard);
    
    expect(wrapper.text()).toContain('16/02/2024');
    expect(wrapper.text()).toContain('29/02/2024');
    expect(wrapper.text()).toContain('Descargar');
    expect(wrapper.find('a.salary-card__download-btn').attributes('href')).toBe('/ruta-a-mi-doc');
    expect(wrapper.find('a.salary-card__open-btn').attributes('href')).toBe('/salarios/10');
  });

  it('should render the correct icon for "Colones"', () => {
    const wrapper = mount(SalaryCard, {
      props: {
        currency: 'Colones',
      },
    });

    const icon = wrapper.findComponent({ name: 'FontAwesomeIcon' });
    expect(icon.props('icon')).toEqual(['fas', 'colon-sign']);
  });

  it('should render the correct icon for "Dólares"', () => {
    const wrapper = mount(SalaryCard, {
      props: {
        currency: 'Dólares',
      },
    });

    const icon = wrapper.findComponent({ name: 'FontAwesomeIcon' });
    expect(icon.props('icon')).toEqual(['fas', 'dollar-sign']);
  });

  it('should render custom props', () => {
    const wrapper = mount(SalaryCard, {
      props: {
        salaryId: 25,
        startDate: '01/03/2024',
        endDate: '15/03/2024',
        docLink: '/docs/test-doc',
      },
    });

    expect(wrapper.text()).toContain('01/03/2024');
    expect(wrapper.text()).toContain('15/03/2024');
    expect(wrapper.find('a.salary-card__download-btn').attributes('href')).toBe('/docs/test-doc');
    expect(wrapper.find('a.salary-card__open-btn').attributes('href')).toBe('/salarios/25');
  });

  it('should manage undefined props', () => {
    const wrapper = mount(SalaryCard, {
      props: {
        salaryId: undefined,
        docLink: undefined,
      },
    });

    expect(wrapper.find('a.salary-card__download-btn').attributes('href')).toBe('/ruta-a-mi-doc'); //default prop
    expect(wrapper.find('a.salary-card__open-btn').attributes('href')).toBe('/salarios/10'); //default prop
  });

  it('should manage invalid dates', () => {
    const wrapper = mount(SalaryCard, {
      props: {
        startDate: 'fecha-no-valida',
        endDate: 'otra-fecha-no-valida',
      },
    });

    expect(wrapper.text()).toContain('fecha-no-valida');
    expect(wrapper.text()).toContain('otra-fecha-no-valida');
  });

  it('should be able to click on download button', async () => {
    const wrapper = mount(SalaryCard);

    const downloadButton = wrapper.find('a.salary-card__download-btn');
    expect(downloadButton.exists()).toBe(true);
    await downloadButton.trigger('click');
    expect(downloadButton.attributes('href')).toBe('/ruta-a-mi-doc');
  });

  it('should be able to click the "Ver Más" button', async () => {
    const wrapper = mount(SalaryCard);

    const openButton = wrapper.find('a.salary-card__open-btn');
    expect(openButton.exists()).toBe(true);
    await openButton.trigger('click');
    expect(openButton.attributes('href')).toBe('/salarios/10');
  });

  it('should render empty strings', () => {
    const wrapper = mount(SalaryCard, {
      props: {
        startDate: '',
        endDate: '',
        docLink: '',
      },
    });

    expect(wrapper.text()).not.toContain('undefined');
    expect(wrapper.find('a.salary-card__download-btn').attributes('href')).toBe('');
  });

  it('should render long content in props', () => {
    const longDocLink = '/ruta-muy-larga-y-compleja-al-documento-de-prueba-que-supera-el-límite';
    const wrapper = mount(SalaryCard, {
      props: {
        docLink: longDocLink,
      },
    });

    expect(wrapper.find('a.salary-card__download-btn').attributes('href')).toBe(longDocLink);
  });
});
