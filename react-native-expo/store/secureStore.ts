import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SecureStoreState {
  /** The symbol of the payment token to use by default. */
  defaultPaymentToken?: string;
  /** The user's selected gRPC endpoint. */
  grpcEndpoint?: string;
}

const initialState: SecureStoreState = {
  defaultPaymentToken: '',
  grpcEndpoint: '',
};

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
    setGrpcEndpoint: (state, action: PayloadAction<string>) => {
      state.grpcEndpoint = action.payload;
    },
  },
});

export const { setDefaultPaymentToken, setGrpcEndpoint } = secureStoreSlice.actions;

export default secureStoreSlice.reducer;
