import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
export const login = createAsyncThunk(
  "users/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const config: AxiosRequestConfig = {
        headers: { "Content-Type": "application/json" },
      };

      const {
        data: { user },
      } = await axios.post("/api/v1/login", { email, password }, config);

      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (userData: FormData, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const {
        data: { user },
      } = await axios.post("/api/v1/register", userData, config);

      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/v1/logout");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const loadUser = createAsyncThunk(
  "users/loadUsr",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await axios.get("/api/v1/me");

      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { users },
      } = await axios.get("/api/v1/admin/users");

      return users;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await axios.get(`/api/v1/admin/users/${id}`);

      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      await axios.put(`/api/v1/admin/users/${id}`, data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/admin/users/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);
