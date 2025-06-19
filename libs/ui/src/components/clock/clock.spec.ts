import { mount } from '@vue/test-utils';
import Clock from './clock.vue';

describe('Clock', () => {
  it('renders properly', () => {
    const wrapper = mount(Clock, {});
    expect(wrapper.text()).toContain('Welcome to Clock');
  });
});
