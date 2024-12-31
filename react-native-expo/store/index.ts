import { configureStore } from '@reduxjs/toolkit';
import depositFlow from './depositFlow';

const store = configureStore({
  reducer: {
    depositFlow,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
