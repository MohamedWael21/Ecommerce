import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProfileState } from "../../types/appState";
import { updatePassword, updateProfile } from "../thunks/profile";
import { deleteUser, updateUser } from "../thunks/users";

const initialState: ProfileState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isUpdated = false;
      state.isDeleted = false;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type === updateProfile.pending.type ||
        action.type === updatePassword.pending.type ||
        action.type === updateUser.pending.type,
      (state) => {
        state.loading = true;
        state.error = "";
        state.isUpdated = false;
      }
    );
    builder.addMatcher(
      (action) => action.type === deleteUser.pending.type,
      (state) => {
        state.loading = true;
        state.error = "";
        state.isDeleted = false;
      }
    );
    builder.addMatcher(
      (action) =>
        action.type === updateProfile.fulfilled.type ||
        action.type === updatePassword.fulfilled.type ||
        action.type === updateUser.fulfilled.type,
      (state, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.error = "";
        state.isUpdated = action.payload || true;
      }
    );
    builder.addMatcher(
      (action) => action.type === deleteUser.fulfilled.type,
      (state) => {
        state.loading = false;
        state.error = "";
        state.isDeleted = true;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type === updateProfile.rejected.type ||
        action.type === updatePassword.rejected.type ||
        action.type === updateUser.rejected.type ||
        action.type === deleteUser.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default profileSlice.reducer;
export const { resetState, clearError } = profileSlice.actions;
