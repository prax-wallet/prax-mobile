import penumbraAddressFactory from '@/factories/penumbraAddress';
import transactionFactory from '@/factories/transaction';
import Transaction from '@/types/Transaction';
import { createSlice } from '@reduxjs/toolkit';

export interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  /** @todo: Populate with real data */
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
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
});

export const {} = transactionsSlice.actions;

export default transactionsSlice.reducer;
