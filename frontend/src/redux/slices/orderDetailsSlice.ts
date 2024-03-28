import { createSlice } from "@reduxjs/toolkit";
import { OrderDetails } from "../../types/appState";
import { getOrderDetails } from "../thunks/order";

const initialState: OrderDetails = {
  loading: false,
  error: "",
  order: null,
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default orderDetailsSlice.reducer;
export const { clearError } = orderDetailsSlice.actions;
