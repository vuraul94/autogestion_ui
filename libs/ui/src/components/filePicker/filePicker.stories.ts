import { Meta, StoryFn, StoryObj } from '@storybook/vue3';
import FilePicker from './filePicker.vue';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: FilePicker,
  title: 'components/filePicker',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { FilePicker },
  setup() {
    return { args };
  },
  template: `
    <FilePicker v-bind="args"></FilePicker>
  `,
});

export const Primary = Template.bind({});
Primary.args = {};

