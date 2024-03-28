import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../types/appState";
import {
  getAdminProducts,
  getAllProducts,
  getProductDetails,
} from "../thunks/products";

const initialState: ProductState = {
  loading: false,
  products: [],
  error: null,
  productsCount: 0,
  product: null,
  resultPerPage: 0,
  filterdProductsCount: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductError(state) {
      state.error = "";
    },
    resetProductState(state) {
      state.product = null;
    },
  },
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
      state.resultPerPage = action.payload.resultPerPage;
      state.filterdProductsCount = action.payload.filterdProductsCount;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.payload as string;
    });
    builder.addCase(getProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAdminProducts.pending, (state) => {
      state.loading = true;
      state.products = [];
      state.error = null;
    });
    builder.addCase(getAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
export const { clearProductError, resetProductState } = productSlice.actions;
