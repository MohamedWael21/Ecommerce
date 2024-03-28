import { createSlice } from "@reduxjs/toolkit";
import { MyOrdersState } from "../../types/appState";
import { getMyOrders } from "../thunks/order";

const initialState: MyOrdersState = {
  loading: false,
  error: "",
  orders: [],
};

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyOrders.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default myOrdersSlice.reducer;
export const { clearError } = myOrdersSlice.actions;
