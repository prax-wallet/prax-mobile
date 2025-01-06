import { Meta, StoryObj } from '@storybook/react';

import Balance from '.';
import balancesResponseFactory from '@/factories/balancesResponse';

const meta: Meta<typeof Balance> = {
  component: Balance,
  tags: ['autodocs'],
  argTypes: {
    balancesResponse: { control: false },
  },
};

export default meta;

export const Basic: StoryObj<typeof Balance> = {
  args: {
    balancesResponse: balancesResponseFactory.build(),
  },
};
