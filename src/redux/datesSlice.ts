import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { DateItem, DatesState } from "../utils/types";

const addItemToArray = (array: DateItem[], item: DateItem) => {
  array.push(item);
  array.sort((a, b) => a.timestamp[0] - b.timestamp[0]);
};

const updateItemInArray = (array: DateItem[], updatedItem: DateItem) => {
  const index = array.findIndex((item) => item.id === updatedItem.id);
  if (index !== -1) {
    array[index] = updatedItem;
    array.sort((a, b) => a.timestamp[0] - b.timestamp[0]);
  }
};

const initialState: DatesState = {
  dateOfBirth: null,
  events: [],
  periods: [],
};

const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    updateDateOfBirth: (state, action: PayloadAction<number | null>) => {
      state.dateOfBirth = action.payload;
    },
    addItem(state, action: PayloadAction<DateItem>) {
      addItemToArray(
        action.payload.timestamp[1] ? state.periods : state.events,
        action.payload
      );
    },
    updateItem(state, action: PayloadAction<DateItem>) {
      updateItemInArray(
        action.payload.timestamp[1] ? state.periods : state.events,
        action.payload
      );
    },
    deleteItem(
      state,
      action: PayloadAction<{ id: string; mode: "date" | "range" }>
    ) {
      if (action.payload.mode === "range")
        state.periods = state.periods.filter(
          (item) => item.id !== action.payload.id
        );
      if (action.payload.mode === "date")
        state.events = state.events.filter(
          (item) => item.id !== action.payload.id
        );
    },
    hydrate: (state, action: PayloadAction<DatesState>) => {
      return action.payload;
    },
  },
});

export const { updateDateOfBirth, addItem, updateItem, deleteItem } =
  datesSlice.actions;
export default datesSlice.reducer;
