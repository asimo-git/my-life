import { nanoid } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./store";
import { addItem } from "./datesSlice";

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
