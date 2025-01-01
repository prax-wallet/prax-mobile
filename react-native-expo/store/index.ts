import { configureStore } from '@reduxjs/toolkit';

import balances from './balances';
import depositFlow from './depositFlow';
import portfolioScreen from './portfolioScreen';
import transactions from './transactions';

const store = configureStore({
  reducer: {
    balances,
    depositFlow,
    portfolioScreen,
    transactions,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
