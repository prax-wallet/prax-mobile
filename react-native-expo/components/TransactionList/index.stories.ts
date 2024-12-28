import { Meta, StoryObj } from '@storybook/react';

import TransactionList from '.';
import transactionFactory from '@/factories/transaction';
import penumbraAddressFactory from '@/factories/penumbraAddress';

const meta: Meta<typeof TransactionList> = {
  component: TransactionList,
  tags: ['autodocs'],
  argTypes: {
    transactions: { control: false },
  },
};

export default meta;

export const Basic: StoryObj<typeof TransactionList> = {
  args: {
    transactions: [
      transactionFactory.build({
        senderAddress: penumbraAddressFactory.build().value,
        senderUsername: 'henry',
      }),
      transactionFactory.build({
        type: 'send',
        recipientAddress: penumbraAddressFactory.build().value,
        recipientUsername: 'cate',
        via: undefined,
      }),
      transactionFactory.build({
        type: 'send',
        recipientAddress: penumbraAddressFactory.build().value,
      }),
    ],
  },
};
