import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allUserState } from "../../types/appState";
import { User } from "../../types/models";
import { getAllUsers } from "../thunks/users";

const initialState: allUserState = {
  loading: false,
  users: [],
  error: "",
};

const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === getAllUsers.pending.type,
      (state) => {
        state.loading = true;
        state.error = "";
      }
    );
    builder.addMatcher(
      (action) => action.type === getAllUsers.fulfilled.type,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.error = "";
        state.users = action.payload;
      }
    );

    builder.addMatcher(
      (action) => action.type === getAllUsers.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default allUserSlice.reducer;
export const { clearError } = allUserSlice.actions;
