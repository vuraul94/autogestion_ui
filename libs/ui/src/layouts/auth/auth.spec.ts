import { mount } from '@vue/test-utils';
import Auth from './auth.vue';

describe('Auth', () => {
  it('renders properly', () => {
    const wrapper = mount(Auth, {});
    expect(wrapper.text()).toContain('Welcome to Auth');
  });
});
