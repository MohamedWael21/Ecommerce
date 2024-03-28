import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allOrderState } from "../../types/appState";
import { Order } from "../../types/models";
import { getAllOrders } from "../thunks/order";

const initialState: allOrderState = {
  loading: false,
  orders: [],
  error: "",
};

const allOrderSlice = createSlice({
  name: "allOrder",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getAllOrders.pending.type,
      (state) => {
        state.loading = true;
        state.error = "";
      }
    );
    builder.addMatcher(
      (action) => action.type === getAllOrders.fulfilled.type,
      (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.error = "";
        state.orders = action.payload;
      }
    );

    builder.addMatcher(
      (action) => action.type === getAllOrders.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default allOrderSlice.reducer;
export const { clearError } = allOrderSlice.actions;
