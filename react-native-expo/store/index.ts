import createSecureStore from 'redux-persist-expo-securestore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import balances from './balances';
import depositFlow from './depositFlow';
import portfolioScreen from './portfolioScreen';
import secureStore from './secureStore';
import transactions from './transactions';

const rootReducer = combineReducers({
  balances,
  depositFlow,
  portfolioScreen,
  secureStore,
  transactions,
});

const store = configureStore({
  reducer: persistReducer(
    {
      key: 'secureStore',
      storage: createSecureStore(),
    },
    rootReducer,
  ),

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          /**
           * @see https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
           */
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
