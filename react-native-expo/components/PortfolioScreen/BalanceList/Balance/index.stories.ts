import { Meta, StoryObj } from '@storybook/react';

import Balance from '.';
import balanceFactory from '@/factories/balance';

const meta: Meta<typeof Balance> = {
  component: Balance,
  tags: ['autodocs'],
  argTypes: {
    balance: { control: false },
  },
};

export default meta;

export const Basic: StoryObj<typeof Balance> = {
  args: {
    balance: balanceFactory.build(),
  },
};
