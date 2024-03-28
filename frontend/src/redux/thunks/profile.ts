import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (userData: FormData, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      await axios.put("/api/v1/me/update", userData, config);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  "profile/update/password",
  async (
    passwords: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await axios.put("/api/v1/password/update", passwords);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);
