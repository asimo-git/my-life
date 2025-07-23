import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface DatesState {
  dateOfBirth: string | null;
  dates: string[];
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
    updateDateOfBirth: (state, action: PayloadAction<string | null>) => {
      state.dateOfBirth = action.payload;
    },
    // addItem: (state, action: PayloadAction<CartItem>) => {
    //   state.items[action.payload.id] = action.payload;
    // },
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

export const { updateDateOfBirth } = datesSlice.actions;
export default datesSlice.reducer;
