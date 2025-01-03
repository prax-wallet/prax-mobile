import { combineReducers } from '@reduxjs/toolkit';

import balances from './balances';
import defaultPaymentTokenScreen from './defaultPaymentTokenScreen';
import depositFlow from './depositFlow';
import portfolioScreen from './portfolioScreen';
import secureStore from './secureStore';
import transactions from './transactions';

/**
 * The root reducer for our Redux store. Exported as its own constant (rather
 * than defining it inline in the store) so that it can be used independently of
 * the app store in settings like tests and Storybook, which don't work well
 * with e.g., `redux-persist`.
 */
const rootReducer = combineReducers({
  balances,
  defaultPaymentTokenScreen,
  depositFlow,
  portfolioScreen,
  secureStore,
  transactions,
});

export default rootReducer;
