import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { DateItem, DatesState, PeriodItem } from "../utils/types";

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
      state.events.push(action.payload);
      state.events.sort((a, b) => a.timestamp - b.timestamp);
    },
    addPeriod(state, action: PayloadAction<PeriodItem>) {
      state.periods.push(action.payload);
      state.periods.sort((a, b) => a.timestamp[0] - b.timestamp[0]);
    },
    updateItem(
      state,
      action: PayloadAction<{
        id: string;
        timestamp: number;
        description: string;
        color: string;
      }>
    ) {
      const index = state.events.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
        state.events.sort((a, b) => a.timestamp - b.timestamp);
      }
    },
    updatePeriod(
      state,
      action: PayloadAction<{
        id: string;
        timestamp: number[];
        description: string;
        color: string;
      }>
    ) {
      const index = state.periods.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.periods[index] = action.payload;
        state.periods.sort((a, b) => a.timestamp[0] - b.timestamp[0]);
      }
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

export const {
  updateDateOfBirth,
  addItem,
  updateItem,
  updatePeriod,
  deleteItem,
  addPeriod,
} = datesSlice.actions;
export default datesSlice.reducer;
