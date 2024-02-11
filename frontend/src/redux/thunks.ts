import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/products");
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data
          ? error.response.data.message
          : error.message;
        return rejectWithValue(message);
      }
    }
  }
);
