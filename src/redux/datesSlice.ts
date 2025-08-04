import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface DatesState {
  dateOfBirth: number | null;
  dates: [number, string][];
  periods: string[];
}

const initialState: DatesState = {
  dateOfBirth: null,
  dates: [],
  periods: [],
};

const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    updateDateOfBirth: (state, action: PayloadAction<number | null>) => {
      state.dateOfBirth = action.payload;
    },
    addItem: (state, action: PayloadAction<[number, string]>) => {
      state.dates.push(action.payload);
      state.dates.sort((a, b) => a[0] - b[0]);
    },
    // increaseQuantity: (state, action: PayloadAction<number>) => {
    //   state.items[action.payload].quantity++;
    // },
    // decreaseQuantity: (state, action: PayloadAction<number>) => {
    //   state.items[action.payload].quantity--;
    //   if (state.items[action.payload].quantity === 0) {
    //     delete state.items[action.payload];
    //   }
    // },
    // removeItem: (state, action: PayloadAction<number>) => {
    //   delete state.items[action.payload];
    // },
    // clearCart: (state) => {
    //   state.items = {};
    // },
    hydrate: (state, action: PayloadAction<DatesState>) => {
      return action.payload;
    },
  },
});

export const { updateDateOfBirth, addItem } = datesSlice.actions;
export default datesSlice.reducer;
