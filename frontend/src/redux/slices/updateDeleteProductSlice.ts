import { createSlice } from "@reduxjs/toolkit";
import { UpdateDeleteProductState } from "../../types/appState";
import { deletProduct, updateProduct } from "../thunks/products";

const initialState: UpdateDeleteProductState = {
  loading: false,
  error: "",
  isDeleted: false,
  isUpdated: false,
};

const updateDeleteProductSlice = createSlice({
  name: "updateDeleteProduct",
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
    builder.addCase(deletProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isDeleted = false;
    });
    builder.addCase(deletProduct.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deletProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isDeleted = false;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default updateDeleteProductSlice.reducer;
export const { clearError, resetState } = updateDeleteProductSlice.actions;
