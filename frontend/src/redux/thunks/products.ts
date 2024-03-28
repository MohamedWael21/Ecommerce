import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    {
      keyword = "",
      currentPage = 1,
      price = [0, 25000],
      category = "",
      rating = 0,
    }: {
      keyword?: string;
      currentPage?: number;
      price?: number[];
      category?: string;
      rating?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${
        price[0]
      }&price[lte]=${price[1]}${
        category ? `&category=${category}` : ""
      }&rating[gte]=${rating}`;
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const {
        data: { product },
      } = await axios.get(`/api/v1/products/${id}`);
      return product;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const reviewProduct = createAsyncThunk(
  "products/review/product",
  async (
    { id, comment, rating }: { id: string; comment: string; rating: number },
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { success },
      } = await axios.put(`/api/v1/review/${id}`, { comment, rating });
      return success;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const getAdminProducts = createAsyncThunk(
  "products/getAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { products },
      } = await axios.get(`/api/v1/admin/products`);
      return products;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData: FormData, { rejectWithValue }) => {
    try {
      const {
        data: { product },
      } = await axios.post(`/api/v1/products`, productData);
      return product;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const deletProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/products/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    {
      product,
      id,
    }: {
      product: FormData;
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await axios.put(`/api/v1/products/${id}`, product);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const getAllReviewsOfProduct = createAsyncThunk(
  "products/getAllReviewsOfProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const {
        data: { reviews },
      } = await axios.get(`/api/v1/reviews/${id}`);
      return reviews;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);

export const deleteReview = createAsyncThunk(
  "products/deleteReview",
  async (
    { productId, id }: { productId: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(`/api/v1/reviews?productId=${productId}&id=${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);
