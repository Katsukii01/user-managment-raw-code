import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';

// Create the Redux store
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// Type for the root state
export type RootState = ReturnType<typeof store.getState>;

// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;
