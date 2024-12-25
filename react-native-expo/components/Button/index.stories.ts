import { Meta, StoryObj } from '@storybook/react';

import Button from '.';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
};

export default meta;

export const Basic: StoryObj<typeof Button> = {
  args: {
    children: 'Deposit',
    actionType: 'default',
  },
};
