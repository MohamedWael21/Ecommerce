import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const {
        data: { message },
      } = await axios.post("/api/v1/password/forgot", { email });
      return message;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (
    {
      resetToken,
      password,
      confirmPassword,
    }: {
      resetToken: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { success },
      } = await axios.post(`/api/v1/password/reset/${resetToken}`, {
        password,
        confirmPassword,
      });
      return success;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);
