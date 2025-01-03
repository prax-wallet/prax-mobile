import createSecureStore from 'redux-persist-expo-securestore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: persistReducer(
    {
      /**
       * The key under which this data will be stored in the device's encrypted
       * storage.
       */
      key: 'reduxState',
      storage: createSecureStore(),
      /**
       * The top-level keys of the Redux state that we want to persist. (In our
       * case, it's just one: the `secureStore` slice.)
       */
      whitelist: ['secureStore'],
    },
    rootReducer,
  ),

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          /**
           * Ignore `redux-persist`-specific actions.
           *
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
