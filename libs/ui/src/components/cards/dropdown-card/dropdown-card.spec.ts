import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import DropdownCard from './dropdown-card.vue'; //

describe('DropdownCard.vue', () => {

  it('renders the title correctly', () => {
    const wrapper = mount(DropdownCard, {
      props: {
        title: 'Persona',
      },
    });
    expect(wrapper.find('h3').text()).toBe('Persona');
  });

  it('renders sections correctly', () => {
    const sections = [
      { title: 'Puesto', content: 'Charlene Reed' },
      { title: 'Salario Base', content: '897,580.74' },
      { title: 'Horario', content: 'Tiempo Completo' },
    ];
    const wrapper = mount(DropdownCard, {
      props: { sections },
    });

    const renderedSections = wrapper.findAll('.dropdown-card__section');
    expect(renderedSections).toHaveLength(sections.length);

    sections.forEach((section, index) => {
      expect(renderedSections[index].find('h4').text()).toBe(section.title);
      expect(renderedSections[index].find('span').text()).toBe(section.content);
    });
  });

  it('toggles content visibility on click when screen width < 768', async () => {
    global.innerWidth = 500;
    const wrapper = mount(DropdownCard);

    // Initial state (closed)
    expect(wrapper.find('.dropdown-card__content').exists()).toBe(false);

    // Trigger click
    await wrapper.find('.dropdown-card__header').trigger('click');
    expect(wrapper.find('.dropdown-card__content').exists()).toBe(true);
    
    // Click again to hide
    await wrapper.find('.dropdown-card__header').trigger('click');
    expect(wrapper.find('.dropdown-card__content').exists()).toBe(false);
  });

  it('content is always visible on desktop (width > 768)', () => {
    global.innerWidth = 1024;
    const wrapper = mount(DropdownCard);
    
    expect(wrapper.find('.dropdown-card__content').exists()).toBe(true);
  });

  it('resizes the window and toggles visibility based on screen width', async () => {
    global.innerWidth = 1024;
    const wrapper = mount(DropdownCard);
    
    // Desktop mode, content visible
    expect(wrapper.find('.dropdown-card__content').exists()).toBe(true);

    // Simulate resizing to mobile size
    global.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.dropdown-card__content').exists()).toBe(false);
  });

  it('should remove resize event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const wrapper = mount(DropdownCard);
    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
