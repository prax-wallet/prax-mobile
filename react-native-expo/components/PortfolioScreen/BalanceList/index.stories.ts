import { Meta, StoryObj } from '@storybook/react';

import BalanceList from '.';
import balanceFactory from '@/factories/balance';

const meta: Meta<typeof BalanceList> = {
  component: BalanceList,
  tags: ['autodocs'],
  argTypes: {
    balances: { control: false },
  },
};

export default meta;

export const Basic: StoryObj<typeof BalanceList> = {
  args: {
    balances: balanceFactory.buildList(5),
  },
};
