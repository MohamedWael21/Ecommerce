import { createSlice } from "@reduxjs/toolkit";
import { deleteReviewState } from "../../types/appState";
import { deleteReview } from "../thunks/products";

const initialState: deleteReviewState = {
  loading: false,
  error: "",
  isDeleted: false,
};

const deleteReviewSlice = createSlice({
  name: "deleteReview",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    resetState: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteReview.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isDeleted = false;
    });
    builder.addCase(deleteReview.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default deleteReviewSlice.reducer;
export const { clearError, resetState } = deleteReviewSlice.actions;
