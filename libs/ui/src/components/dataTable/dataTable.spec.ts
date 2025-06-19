import { mount } from '@vue/test-utils';
import DataTable from './dataTable.vue';

describe('DataTable', () => {
  it('renders properly', () => {
    const wrapper = mount(DataTable, {});
    expect(wrapper.text()).toContain('Welcome to DataTable');
  });
});
