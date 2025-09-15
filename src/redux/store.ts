import { configureStore } from "@reduxjs/toolkit";
import datesReducer from "./datesSlice";
import scaleReducer from "./scaleSlice";

export const store = configureStore({
  reducer: {
    dates: datesReducer,
    scale: scaleReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
