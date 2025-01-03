import { ChainRegistryClient, EntityMetadata } from '@penumbra-labs/registry';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

/** State specific to `GrpcScreen`. */
export interface GrpcScreenState {
  /**
   * The current value of the gRPC text input field. This is a separate piece of
   * state from the gRPC endpoint itself (which is in the `secureStore` slice),
   * since we don't want to update the persistent secure storage with the
   * temporary value of the input field.
   */
  grpcEndpointInput: string;
  /**
   * gRPC endpoints as loaded from the `ChainRegistryClient`.
   */
  grpcEndpoints: EntityMetadata[];
  isLoading: boolean;
  error?: unknown;
}

const initialState: GrpcScreenState = {
  grpcEndpointInput: '',
  grpcEndpoints: [],
  isLoading: false,
};

export const grpcScreenSlice = createSlice({
  name: 'grpcScreen',
  initialState,
  reducers: {
    setGrpcEndpointInput: (state, action: PayloadAction<string>) => {
      state.grpcEndpointInput = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload;
    },
    setGrpcEndpoints: (state, action: PayloadAction<EntityMetadata[]>) => {
      state.grpcEndpoints = action.payload;
    },
  },
});

export const { setGrpcEndpointInput, setIsLoading, setError, setGrpcEndpoints } =
  grpcScreenSlice.actions;

export const loadGrpcEndpoints = createAsyncThunk(
  'grpcScreen/loadGrpcEndpoints',
  async (_, thunkApi) => {
    thunkApi.dispatch(setIsLoading(true));

    try {
      const { rpcs } = await new ChainRegistryClient().remote.globals();
      thunkApi.dispatch(setGrpcEndpoints(rpcs));
    } catch (e) {
      thunkApi.dispatch(setError(e));
    } finally {
      thunkApi.dispatch(setIsLoading(false));
    }
  },
);

export default grpcScreenSlice.reducer;
