import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type DateItem = {
  id: string;
  timestamp: number;
  description: string;
};

interface DatesState {
  dateOfBirth: number | null;
  events: DateItem[];
  periods: string[];
}

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
    updateItem(
      state,
      action: PayloadAction<{
        id: string;
        timestamp: number;
        description: string;
      }>
    ) {
      const index = state.events.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
        state.events.sort((a, b) => a.timestamp - b.timestamp);
      }
      console.log("jjjjj");
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.events = state.events.filter((item) => item.id !== action.payload);
    },
    hydrate: (state, action: PayloadAction<DatesState>) => {
      return action.payload;
    },
  },
});

export const { updateDateOfBirth, addItem, updateItem, deleteItem } =
  datesSlice.actions;
export default datesSlice.reducer;
