/**
 * This Storybook story is specifically created to demonstrate text variants.
 * Its component is the built-in `<Text />` component from Dripsy, so there is
 * no component file separate from this story file.
 */
import { Meta, StoryObj } from '@storybook/react';
import dripsyTheme from '@/utils/dripsyTheme';
import { Text } from 'dripsy';

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
