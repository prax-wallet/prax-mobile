/**
 * A pseudo-component, specifically for the case of creating a Storybook story
 * to demonstrate text variants.
 */
import { Meta, StoryObj } from '@storybook/react/*';
import dripsyTheme from '@/utils/dripsyTheme';
import { Text } from 'dripsy';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(dripsyTheme.text),
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'body',
  },
};
