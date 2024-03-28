import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../types/appState";
import { login, register, loadUser, logout } from "../thunks/users";
import { User } from "../../types/models";

const initialState: UserState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder
      .addMatcher(
        (action) =>
          action.type === login.pending.type ||
          action.type === register.pending.type ||
          action.type === loadUser.pending.type,
        (state) => {
          state.loading = true;
          state.isAuthenticated = false;
          state.error = "";
        }
      )
      .addMatcher(
        (action) =>
          action.type === login.fulfilled.type ||
          action.type === register.fulfilled.type ||
          action.type === loadUser.fulfilled.type,
        (state, action: PayloadAction<User>) => {
          state.isAuthenticated = true;
          state.loading = false;
          state.user = action.payload;
          state.error = "";
        }
      )
      .addMatcher(
        (action) =>
          action.type === login.rejected.type ||
          action.type === register.rejected.type ||
          action.type === loadUser.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
          if (!(action.type === loadUser.rejected.type)) {
            state.error = action.payload;
          }
        }
      );
  },
});

export default userSlice.reducer;
export const { clearError } = userSlice.actions;
