import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../types/appState";
import { CartItem, ShippingInfo } from "../../types/models";

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  shippingInfo: JSON.parse(
    localStorage.getItem("shippingInfo") ||
      `{
    "address": "",
    "city": "",
    "state": "",
    "country": "",
    "pinCode": null,
    "phoneNo": null
  }`
  ),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const addedItem = action.payload;
      const cartitem = state.cartItems.find(
        (item) => item.productId === addedItem.productId
      );
      if (cartitem) {
        state.cartItems = state.cartItems.map((item) =>
          item.productId === addedItem.productId ? addedItem : item
        );
      } else {
        state.cartItems.push(addedItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    reomoveFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
    resetCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, reomoveFromCart, saveShippingInfo } =
  cartSlice.actions;
