import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Order } from "../../types/models";
export const createOrder = createAsyncThunk(
  "order/newOrder",
  async (order: Order, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = {
        headers: { "Content-Type": "application/json" },
      };

      const {
        data: { newOrder },
      } = await axios.post("/api/v1/orders", order, config);

      return newOrder;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { orders },
      } = await axios.get("/api/v1/orders/me");

      return orders;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/orderDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const {
        data: { order },
      } = await axios.get(`/api/v1/order/${id}`);

      return order;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/allOrders",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { orders },
      } = await axios.get(`/api/v1/admin/orders`);

      return orders;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (
    { id, status }: { id: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.put(`/api/v1/admin/order/${id}`, { status });
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/admin/order/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);
