import { mount } from '@vue/test-utils';
import TopBar from './top-bar.vue';

describe('TopBar', () => {
  it('renders properly', () => {
    const wrapper = mount(TopBar, {});
    expect(wrapper.text()).toContain('Welcome to TopBar');
  });
});
