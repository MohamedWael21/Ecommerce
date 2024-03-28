import { createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../../types/appState";
import { getUserDetails } from "../thunks/users";

const initialState: UserDetails = {
  loading: false,
  error: "",
  user: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default userDetailsSlice.reducer;
export const { clearError } = userDetailsSlice.actions;
