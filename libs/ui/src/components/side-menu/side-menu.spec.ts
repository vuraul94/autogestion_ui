import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SideMenu from './side-menu.vue'

describe('SideMenu.vue', () => {
  const mockLinks = [
    { route: '/home', text: 'Home', icon: ['fas', 'home'] },
    { route: '/about', text: 'About', icon: ['fas', 'info'] },
  ];

  const defaultProps = {
    isMobile: false,
    links: mockLinks,
  };

  it('renders properly when not collapsed', () => {
    const wrapper = mount(SideMenu, {
      props: { ...defaultProps, isMobile: false },
    });

    expect(wrapper.find('.side-menu').classes()).not.toContain('collapsed');
    expect(wrapper.find('img[alt="logo"]').exists()).toBe(true);
    expect(wrapper.findAll('.side-menu__navigation-item').length).toBe(mockLinks.length);
  });

  it('renders properly when collapsed', async () => {
    const wrapper = mount(SideMenu, {
      props: { ...defaultProps, isMobile: false },
    });

    const button = wrapper.find('button');
    await button.trigger('click'); // Toggle collapse

    expect(wrapper.find('.side-menu').classes()).toContain('collapsed');
    expect(wrapper.find('img[alt="logo"]').exists()).toBe(false);
  });

  it('renders mobile version', () => {
    const wrapper = mount(SideMenu, {
      props: { ...defaultProps, isMobile: true },
    });

    expect(wrapper.find('.side-menu').classes()).toContain('mobile');
    expect(wrapper.find('.side-menu__header--mobile').exists()).toBe(true);
  });

  it('exposes isCollapsed and toggleMenu correctly', async () => {
    const wrapper = mount(SideMenu);

    expect(wrapper.vm.isCollapsed).toBe(false);
    wrapper.vm.toggleMenu();
    expect(wrapper.vm.isCollapsed).toBe(true);
  });

  it('renders correct icon depending on collapse state', async () => {
    const wrapper = mount(SideMenu, {
      props: { ...defaultProps },
    });

    let icon = wrapper.findComponent({ name: 'FontAwesomeIcon' });
    expect(icon.props('icon')).toEqual(['fas', 'times']); // Menu open

    await wrapper.find('button').trigger('click'); // Toggle collapse
    icon = wrapper.findComponent({ name: 'FontAwesomeIcon' });
    expect(icon.props('icon')).toEqual(['fas', 'bars']); // Menu collapsed
  });
});
