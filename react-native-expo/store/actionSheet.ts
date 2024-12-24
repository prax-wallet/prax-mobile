import { createSlice } from '@reduxjs/toolkit';

export interface ActionSheetState {
  isOpen: boolean;
}

const initialState: ActionSheetState = {
  isOpen: false,
};

export const actionSheetSlice = createSlice({
  name: 'actionSheet',
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

export const { open, close } = actionSheetSlice.actions;

export default actionSheetSlice.reducer;
