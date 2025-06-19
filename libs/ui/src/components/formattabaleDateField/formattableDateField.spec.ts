import { mount } from '@vue/test-utils';
import FormattableDateField from './formattableDateField.vue';

describe('FormattableDateField', () => {
  it('renders properly', () => {
    const wrapper = mount(FormattableDateField, {});
    expect(wrapper.text()).toContain('Welcome to FormattableDateField');
  });
});
