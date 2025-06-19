import { mount } from '@vue/test-utils';
import Main from './main.vue';

describe('Main', () => {
  it('renders properly', () => {
    const wrapper = mount(Main, {});
    expect(wrapper.text()).toContain('Welcome to Main');
  });
});
