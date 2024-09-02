import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use the dispatch function with TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>();
