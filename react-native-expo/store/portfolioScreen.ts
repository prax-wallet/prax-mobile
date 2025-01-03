import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** State specific to `PortfolioScreen`. */
export interface PortfolioScreenState {
  /**
   * The symbol of the currently selected asset (for viewing tarnsactions,
   * sending, etc.).
   */
  selectedAssetSymbol?: string;
}

const initialState: PortfolioScreenState = {};

export const portfolioScreenSlice = createSlice({
  name: 'portfolioScreen',
  initialState,
  reducers: {
    setSelectedAssetSymbol(state, action: PayloadAction<string | undefined>) {
      state.selectedAssetSymbol = action.payload;
    },
  },
});

export const { setSelectedAssetSymbol } = portfolioScreenSlice.actions;

export default portfolioScreenSlice.reducer;
