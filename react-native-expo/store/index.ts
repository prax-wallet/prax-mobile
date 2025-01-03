import { configureStore } from '@reduxjs/toolkit';

import depositFlow from './depositFlow';
import transactions from './transactions';

const store = configureStore({
  reducer: {
    depositFlow,
    transactions,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
