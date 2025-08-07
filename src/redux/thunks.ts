import { nanoid } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./store";
import { addItem, addPeriod } from "./datesSlice";

export function addNewItemThunk() {
  return function (dispatch: AppDispatch, getState: () => RootState) {
    const state = getState().dates;
    const lastTimestamp =
      state.events.at(-1)?.timestamp ?? state.dateOfBirth ?? 0;

    const newItem = {
      id: nanoid(),
      timestamp: lastTimestamp,
      description: "",
    };

    dispatch(addItem(newItem));
  };
}

export function addNewPeriodThunk() {
  return function (dispatch: AppDispatch, getState: () => RootState) {
    const state = getState().dates;

    const lastPeriod = state.periods.at(-1);
    const startTimestamp =
      lastPeriod?.timestamp[1] ?? state.dateOfBirth ?? Date.now();

    const newItem = {
      id: nanoid(),
      timestamp: [startTimestamp, Date.now()],
      description: "",
    };

    dispatch(addPeriod(newItem));
  };
}
