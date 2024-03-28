import { createSlice } from "@reduxjs/toolkit";
import { UpdateDeleteOrderState } from "../../types/appState";
import { deleteOrder, updateOrder } from "../thunks/order";

const initialState: UpdateDeleteOrderState = {
  loading: false,
  error: "",
  isDeleted: false,
  isUpdated: false,
};

const updateDeleteOrderSlice = createSlice({
  name: "updateDeleteOrder",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    resetState: (state) => {
      state.isDeleted = false;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isDeleted = false;
    });
    builder.addCase(deleteOrder.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isUpdated = false;
    });
    builder.addCase(updateOrder.fulfilled, (state) => {
      state.loading = false;
      state.isUpdated = true;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default updateDeleteOrderSlice.reducer;
export const { clearError, resetState } = updateDeleteOrderSlice.actions;
