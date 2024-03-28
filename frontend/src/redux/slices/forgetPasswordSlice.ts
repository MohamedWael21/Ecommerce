import { createSlice } from "@reduxjs/toolkit";
import { ForgetPasswordState } from "../../types/appState";
import { forgetPassword, resetPassword } from "../thunks/forgetPassword";

const initialState: ForgetPasswordState = {
  loading: false,
  message: "",
  error: "",
  success: false,
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = "";
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgetPassword.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload!;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default forgetPasswordSlice.reducer;
export const { resetState } = forgetPasswordSlice.actions;
