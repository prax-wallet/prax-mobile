import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SecureStoreState {
  /** The symbol of the payment token to use by default. */
  defaultPaymentToken?: string;
}

const initialState: SecureStoreState = {};

/**
 * All values in this slice are persisted to the app's secure storage via
 * `expo-secure-storage`. Use it for things like user preferences that need to
 * persist between app restarts/etc.
 */
export const secureStoreSlice = createSlice({
  name: 'secureStore',
  initialState,
  reducers: {
    setDefaultPaymentToken: (state, action: PayloadAction<string>) => {
      state.defaultPaymentToken = action.payload;
    },
  },
});

export const { setDefaultPaymentToken } = secureStoreSlice.actions;

export default secureStoreSlice.reducer;
