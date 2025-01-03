import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** State specific to `DefaultPaymentTokenScreen`. */
export interface DefaultPaymentTokenScreenState {
  searchText: string;
}

const initialState: DefaultPaymentTokenScreenState = {
  searchText: '',
};

export const defaultPaymentTokenScreenSlice = createSlice({
  name: 'portfolioScreen',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = defaultPaymentTokenScreenSlice.actions;

export default defaultPaymentTokenScreenSlice.reducer;
