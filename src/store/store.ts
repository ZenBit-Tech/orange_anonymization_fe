import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/auth.slice';
import { AUTH_THUNK_TYPES } from './auth/auth.constants';
import jobsSlice from './slices/jobsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [`${AUTH_THUNK_TYPES.VERIFY_MAGIC_LINK}/fulfilled`],
      },
    }),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
