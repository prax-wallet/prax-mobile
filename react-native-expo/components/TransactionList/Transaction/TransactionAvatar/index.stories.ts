import { Meta, StoryObj } from '@storybook/react';

import TransactionAvatar from '.';

const meta: Meta<typeof TransactionAvatar> = {
  component: TransactionAvatar,
  tags: ['autodocs'],
};

export default meta;

export const Basic: StoryObj<typeof TransactionAvatar> = {
  args: {
    direction: 'outgoing',
    via: 'link',
  },
};
