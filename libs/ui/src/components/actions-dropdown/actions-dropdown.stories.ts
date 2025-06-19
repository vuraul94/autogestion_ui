import { Meta, StoryFn } from '@storybook/vue3';
import ActionsDropdown from './actions-dropdown.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  title: 'Components/ActionsDropdown',
  component: ActionsDropdown,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { ActionsDropdown, FontAwesomeIcon },
  setup() {
    return { args };
  },
  template: '<ActionsDropdown v-bind="args"><FontAwesomeIcon :icon="args.icon" /></ActionsDropdown>',
});

export const Default = Template.bind({});
Default.args = {
  actions: [
    { label: 'Edit', clickHandler: () => alert('Edit clicked') },
    { label: 'Delete', clickHandler: () => alert('Delete clicked') },
    { label: 'View Details', href: '#' },
  ],
  icon: ['fas', 'ellipsis-v'],
  menuDir: 'right',
};

export const LeftAligned = Template.bind({});
LeftAligned.args = {
  actions: [
    { label: 'Download', clickHandler: () => alert('Download clicked') },
    { label: 'Share', clickHandler: () => alert('Share clicked') },
    { label: 'Report', href: '#' },
  ],
  icon: ['fas', 'bars'],
  menuDir: 'left',
};
