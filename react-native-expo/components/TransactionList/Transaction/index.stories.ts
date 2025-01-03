import { Meta, StoryObj } from '@storybook/react';

import Transaction from '.';

const MOCK_PENUMBRA_ADDRESS =
  'penumbra147mfall0zr6am5r45qkwht7xqqrdsp50czde7empv7yq2nk3z8yyfh9k9520ddgswkmzar22vhz9dwtuem7uxw0qytfpv7lk3q9dp8ccaw2fn5c838rfackazmgf3ahh09cxmz';

const BASE_TRANSACTION = {
  id: 'abc123',
  memo: 'This is a memo',
  via: 'link' as const,
};

const TRANSACTION_WITH_SENDER_USERNAME = {
  name: 'Receive transaction with sender username',
  txn: {
    ...BASE_TRANSACTION,

    type: 'receive' as const,
    senderAddress: MOCK_PENUMBRA_ADDRESS,
    senderUsername: 'henry',
  },
};

const TRANSACTION_WITHOUT_SENDER_USERNAME = {
  name: 'Receive transaction without sender username',
  txn: {
    ...BASE_TRANSACTION,

    type: 'receive' as const,
    senderAddress: MOCK_PENUMBRA_ADDRESS,
  },
};

const meta: Meta<typeof Transaction> = {
  component: Transaction,
  tags: ['autodocs'],
  argTypes: {
    transaction: {
      options: [TRANSACTION_WITH_SENDER_USERNAME.name, TRANSACTION_WITHOUT_SENDER_USERNAME.name],
      mapping: {
        [TRANSACTION_WITH_SENDER_USERNAME.name]: TRANSACTION_WITH_SENDER_USERNAME.txn,
        [TRANSACTION_WITHOUT_SENDER_USERNAME.name]: TRANSACTION_WITHOUT_SENDER_USERNAME.txn,
      },
    },
  },
};

export default meta;

export const Basic: StoryObj<typeof Transaction> = {
  args: {
    transaction: TRANSACTION_WITH_SENDER_USERNAME.txn,
  },
};
