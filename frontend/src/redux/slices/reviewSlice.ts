import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReviewState } from "../../types/appState";
import { reviewProduct } from "../thunks/products";

const initialState: ReviewState = {
  loading: false,
  success: false,
  error: "",
};

const reviewSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetReview(state) {
      state.success = false;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === reviewProduct.pending.type,
      (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      }
    );
    builder.addMatcher(
      (action) => action.type === reviewProduct.fulfilled.type,
      (state, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.error = "";
        state.success = action.payload;
      }
    );

    builder.addMatcher(
      (action) => action.type === reviewProduct.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default reviewSlice.reducer;
export const { resetReview, clearError } = reviewSlice.actions;
