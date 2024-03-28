import { createSlice } from "@reduxjs/toolkit";
import { NewProductState } from "../../types/appState";
import { createProduct } from "../thunks/products";

const initialState: NewProductState = {
  loading: false,
  error: "",
  product: null,
  success: false,
};

const newProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    resetState: (state) => {
      state.product = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.success = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload as string;
    });
  },
});

export default newProductSlice.reducer;
export const { clearError, resetState } = newProductSlice.actions;
