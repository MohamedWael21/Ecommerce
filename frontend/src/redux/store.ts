import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import userReducer from "./slices/userSlice";
import profileReducer from "./slices/profileSlice";
import forgetPasswordReducer from "./slices/forgetPasswordSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/newOrderSlice";
import myOrdersReducer from "./slices/myOrdersSlice";
import orderDetailsReducer from "./slices/orderDetailsSlice";
import reviewReducer from "./slices/reviewSlice";
import newProductReducer from "./slices/newProductSlice";
import updateDeleteProductReducer from "./slices/updateDeleteProductSlice";
import updateDeleteOrderReducer from "./slices/updateDeleteOrderSlice";
import allOrderReducer from "./slices/allOrderSlice";
import allUserRedcucer from "./slices/allUserSlice";
import userDetailsReducer from "./slices/userDetailsSlice";
import productsReviewReducer from "./slices/productsReviewSlice";
import deleteReviewReducer from "./slices/deleteReviewSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    profile: profileReducer,
    forgetPassword: forgetPasswordReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    review: reviewReducer,
    newProduct: newProductReducer,
    updateDeleteProduct: updateDeleteProductReducer,
    orders: allOrderReducer,
    updateDeleteOrder: updateDeleteOrderReducer,
    users: allUserRedcucer,
    userDetails: userDetailsReducer,
    productReview: productsReviewReducer,
    deleteReview: deleteReviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
