import { configureStore } from '@reduxjs/toolkit';
import actionSheet from './actionSheet';

const store = configureStore({
  reducer: {
    actionSheet,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
