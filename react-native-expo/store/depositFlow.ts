import { createSlice } from '@reduxjs/toolkit';

export interface DepositFlowState {
  isOpen: boolean;
}

const initialState: DepositFlowState = {
  isOpen: false,
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
  },
});

export const { open, close } = depositFlowSlice.actions;

export default depositFlowSlice.reducer;
