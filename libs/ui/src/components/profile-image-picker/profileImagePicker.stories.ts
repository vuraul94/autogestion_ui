import { Meta, StoryFn, StoryObj } from '@storybook/vue3';
import ProfileImagePicker from './profileImagePicker.vue';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: ProfileImagePicker,
  title: 'components/ProfileImagePicker',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { ProfileImagePicker },
  setup() {
    return { args };
  },
  template: `
    <ProfileImagePicker v-bind="args"></ProfileImagePicker>
  `,
});

export const Primary = Template.bind({});
Primary.args = {};

