import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DepositFlowStep = 'depositMethod' | 'address' | 'help';

export interface DepositFlowState {
  /** Whether the deposit action sheet is currently open. */
  isOpen: boolean;
  /** Which step we're at in the deposit flow. */
  step: DepositFlowStep;
}

const initialState: DepositFlowState = {
  isOpen: false,
  step: 'depositMethod',
};

export const depositFlowSlice = createSlice({
  name: 'depositFlow',
  initialState,
  reducers: {
    open: state => {
      state.isOpen = true;
    },
    close: state => {
      state.isOpen = false;
    },
    setStep: (state, action: PayloadAction<DepositFlowStep>) => {
      state.step = action.payload;
    },
  },
});

export const { open, close, setStep } = depositFlowSlice.actions;

export default depositFlowSlice.reducer;
