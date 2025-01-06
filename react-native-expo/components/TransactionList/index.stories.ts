import { Meta, StoryObj } from '@storybook/react';

import TransactionList from '.';
import transactionFactory from '@/factories/transaction';
import addressFactory from '@/factories/Address';

const meta: Meta<typeof TransactionList> = {
  component: TransactionList,
  tags: ['autodocs'],
  argTypes: {
    transactions: { control: false },
    primaryAction: { control: false },
  },
};

export default meta;

export const Basic: StoryObj<typeof TransactionList> = {
  args: {
    showTitle: true,
    transactions: [
      transactionFactory.build({
        senderAddress: addressFactory.build().value,
        senderUsername: 'henry',
      }),
      transactionFactory.build({
        type: 'send',
        recipientAddress: addressFactory.build().value,
        recipientUsername: 'cate',
        via: undefined,
      }),
      transactionFactory.build({
        type: 'send',
        recipientAddress: addressFactory.build().value,
      }),
    ],
  },
};
