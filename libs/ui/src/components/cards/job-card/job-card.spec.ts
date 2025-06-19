import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import JobCard from './job-card.vue'; // Ajusta el path según tu estructura

describe('JobCard.vue', () => {

  it('renders the job name correctly', () => {
    const wrapper = mount(JobCard, {
      props: {
        name: 'Jefe de Sistemas Informáticos',
      },
    });
    expect(wrapper.find('.text-dark-4').text()).toBe('Jefe de Sistemas Informáticos');
  });

  it('renders the default job state and schedule', () => {
    const wrapper = mount(JobCard);

    expect(wrapper.findAll('.job-card__subcard-content')[0].find('span.font-bold').text()).toBe('Activo');
    expect(wrapper.findAll('.job-card__subcard-content')[1].find('span.font-bold').text()).toBe('CH, L-J, 7:30 - 4:30  V, 7:30 - 4:00');
  });

  it('applies the correct icon class based on color prop', () => {
    const wrapper = mount(JobCard, {
      props: {
        color: 'primary',
      },
    });

    const iconDiv = wrapper.find('.icon-pill--primary');
    expect(iconDiv.exists()).toBe(true);
  });

  it('applies the correct subcard class based on color prop', () => {
    const wrapper = mount(JobCard, {
      props: {
        color: 'primary',
      },
    });

    const subcards = wrapper.findAll('.card--primary');
    expect(subcards.length).toBe(2);
  });

  it('renders props correctly when passed', () => {
    const wrapper = mount(JobCard, {
      props: {
        name: 'Analista de Datos',
        state: 'Inactivo',
        schedule: 'Lunes a Viernes, 8:00 - 5:00',
        color: 'warning',
      },
    });

    expect(wrapper.find('.text-dark-4').text()).toBe('Analista de Datos');
    expect(wrapper.findAll('.job-card__subcard-content')[0].find('span.font-bold').text()).toBe('Inactivo');
    expect(wrapper.findAll('.job-card__subcard-content')[1].find('span.font-bold').text()).toBe('Lunes a Viernes, 8:00 - 5:00');
    expect(wrapper.find('.icon-pill--warning').exists()).toBe(true);
    expect(wrapper.findAll('.card--warning').length).toBe(2);
  });
});
