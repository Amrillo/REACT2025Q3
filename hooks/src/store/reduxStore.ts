import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterPages';
import { termsApi } from './features/termsApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [termsApi.reducerPath]: termsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(termsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
