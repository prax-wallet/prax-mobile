import addressFactory from '@/factories/address';
import transactionFactory from '@/factories/transaction';
import Transaction from '@/types/Transaction';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bech32mAddress } from '@penumbra-zone/bech32m/penumbra';

export interface TransactionsState {
  transactions: Transaction[];
  searchText: string;
}

const initialState: TransactionsState = {
  /** @todo: Populate with real data */
  transactions: [
    transactionFactory.build({
      senderAddress: bech32mAddress(addressFactory.build()),
      senderUsername: 'henry',
    }),
    transactionFactory.build({
      type: 'send',
      recipientAddress: bech32mAddress(addressFactory.build()),
      recipientUsername: 'cate',
      via: undefined,
    }),
    transactionFactory.build({
      type: 'send',
      recipientAddress: bech32mAddress(addressFactory.build()),
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
