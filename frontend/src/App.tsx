import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import Auth from "./components/User/Auth";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { loadUser } from "./redux/thunks/users";
import UserOptions from "./components/layout/Header/UserOptions";
import Profile from "./components/User/Profile";
import UserProtectedRoute from "./components/UserProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgetPassword from "./components/User/ForgetPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Loader from "./components/layout/Loader/Loader";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UserList from "./components/Admin/UserList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductsReview from "./components/Admin/ProductsReview";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { isAuthenticated, user } = useAppSelector((state) => state.user);

  const getStripeApiKey = async () => {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser()).then(() => {
      setIsReady(true);
    });
  }, [dispatch, loadUser]);

  useEffect(() => {
    if (isReady) {
      getStripeApiKey();
    }
  }, [isReady]);

  // not yet fetch data of the user
  if (!isReady) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      {isAuthenticated && <UserOptions user={user!} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:keyword?" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/password/forgot" element={<ForgetPassword />} />
        <Route path="/password/reset/:resetToken" element={<ResetPassword />} />

        <Route element={<UserProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route
            path="/process/payment"
            element={
              stripeApiKey ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              ) : (
                <Loader />
              )
            }
          />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders/me" element={<MyOrders />} />

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/product" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/user/:id" element={<UpdateUser />} />
            <Route path="/admin/reviews" element={<ProductsReview />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
