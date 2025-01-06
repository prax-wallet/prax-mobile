import { Meta, StoryObj } from '@storybook/react';

import Box from '.';
import { Text } from 'dripsy';

const meta: Meta<typeof Box> = {
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
};

export default meta;

export const Basic: StoryObj<typeof Box> = {
  args: {
    padding: true,
    children: <Text>Box content goes here</Text>,
  },
};
