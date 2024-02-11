import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../types/appState";
import { getAllProducts } from "../thunks";

const initialState: ProductState = {
  loading: false,
  products: [],
  error: null,
  productsCount: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.products = [];
      state.error = null;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;
