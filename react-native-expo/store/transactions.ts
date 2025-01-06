import penumbraAddressFactory from '@/factories/penumbraAddress';
import transactionFactory from '@/factories/transaction';
import Transaction from '@/types/Transaction';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TransactionsState {
  transactions: Transaction[];
  searchText: string;
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
  searchText: '',
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = transactionsSlice.actions;

export default transactionsSlice.reducer;
