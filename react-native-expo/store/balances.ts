import balanceFactory from '@/factories/balance';
import Balance from '@/types/Balance';
import { createSlice } from '@reduxjs/toolkit';

export interface BalancesState {
  balances: Balance[];
}

const initialState: BalancesState = {
  /** @todo: Populate with real data */
  balances: balanceFactory.buildList(5),
};

export const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {},
});

export const {} = balancesSlice.actions;

export default balancesSlice.reducer;
