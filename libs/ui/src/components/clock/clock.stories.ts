import Clock from './clock.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Clock',
  component: Clock,
  argTypes: {
    timezone: {
      control: {
        type: 'select',
        options: [
          'UTC',
          'America/New_York',
          'America/Los_Angeles',
          'Europe/London',
          'Europe/Paris',
          'Asia/Tokyo',
          'Australia/Sydney',
          'America/Costa_Rica',
        ],
      },
      description: 'Timezone for the clock display',
      defaultValue: 'UTC',
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { Clock },
  setup() {
    return { args };
  },
  template: '<Clock v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  timezone: 'UTC',
};

// Story con múltiples zonas horarias como ejemplos
export const MultipleTimezones: StoryFn = () => ({
  components: { Clock },
  template: `
    <div>
      <div style="margin-bottom: 20px;">
        <h3>UTC</h3>
        <Clock timezone="UTC" />
      </div>
      <div style="margin-bottom: 20px;">
        <h3>New York (America/New_York)</h3>
        <Clock timezone="America/New_York" />
      </div>
      <div style="margin-bottom: 20px;">
        <h3>Los Angeles (America/Los_Angeles)</h3>
        <Clock timezone="America/Los_Angeles" />
      </div>
      <div style="margin-bottom: 20px;">
        <h3>London (Europe/London)</h3>
        <Clock timezone="Europe/London" />
      </div>
      <div style="margin-bottom: 20px;">
        <h3>Paris (Europe/Paris)</h3>
        <Clock timezone="Europe/Paris" />
      </div>
      <div style="margin-bottom: 20px;">
        <h3>Tokyo (Asia/Tokyo)</h3>
        <Clock timezone="Asia/Tokyo" />
      </div>
      <div style="margin-bottom: 20px;">
        <h3>Sydney (Australia/Sydney)</h3>
        <Clock timezone="Australia/Sydney" />
      </div>
      <div style="margin-bottom: 20px;">
        <h3>Costa Rica (America/Costa_Rica)</h3>
        <Clock timezone="America/Costa_Rica" />
      </div>
    </div>
  `,
});
