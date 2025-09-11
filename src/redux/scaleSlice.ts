import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const scaleSlice = createSlice({
  name: "scale",
  initialState: 1,
  reducers: {
    zoomIn: (state) => +(state * 1.1).toFixed(1),
    zoomOut: (state) => +(state * 0.9).toFixed(1),
    hydrate: (_, action: PayloadAction<number>) => action.payload,
  },
});

export const { zoomIn, zoomOut, hydrate } = scaleSlice.actions;
export default scaleSlice.reducer;
