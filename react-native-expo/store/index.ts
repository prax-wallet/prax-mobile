import createSecureStore from 'redux-persist-expo-securestore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: persistReducer(
    {
      key: 'reduxState',
      storage: createSecureStore(),
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
