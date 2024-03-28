import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { productsReviewState } from "../../types/appState";
import { Review } from "../../types/models";
import { getAllReviewsOfProduct } from "../thunks/products";

const initialState: productsReviewState = {
  loading: false,
  reviews: [],
  error: "",
};

const productsReviewSlice = createSlice({
  name: "productsReview",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getAllReviewsOfProduct.pending.type,
      (state) => {
        state.loading = true;
        state.error = "";
      }
    );
    builder.addMatcher(
      (action) => action.type === getAllReviewsOfProduct.fulfilled.type,
      (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.error = "";
        state.reviews = action.payload;
      }
    );

    builder.addMatcher(
      (action) => action.type === getAllReviewsOfProduct.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default productsReviewSlice.reducer;
export const { clearError } = productsReviewSlice.actions;
