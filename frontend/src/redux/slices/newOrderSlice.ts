import { createSlice } from "@reduxjs/toolkit";
import { NewOrderState } from "../../types/appState";
import { createOrder } from "../thunks/order";

const initialState: NewOrderState = {
  loading: false,
  error: "",
  order: null,
};

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default newOrderSlice.reducer;
export const { clearError } = newOrderSlice.actions;
