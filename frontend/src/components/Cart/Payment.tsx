import "./payment.css";
import HelmetData from "../layout/HelmetData";
import CheckOutStep from "./CheckOutStep";
import { Typography } from "@mui/material";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../redux/slices/newOrderSlice";
import { Order } from "../../types/models";
import { createOrder } from "../../redux/thunks/order";
import ConfirmOrder from "./ConfirmOrder";
const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo") || "null");

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { shippingInfo, cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { error } = useAppSelector((state) => state.newOrder);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  if (!shippingInfo.address || !orderInfo) {
    return <ConfirmOrder />;
  }

  const orderItems = cartItems.map((cartItem) => ({
    name: cartItem.name,
    price: cartItem.price,
    quantity: cartItem.quantity,
    image: cartItem.image,
    product: cartItem.productId,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (payBtn.current) {
      payBtn.current.disabled = true;
      try {
        const config: AxiosRequestConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const paymentData = {
          amount: Math.round(orderInfo.totalPrice * 100),
        };
        const { data } = await axios.post(
          "/api/v1/payment/process",
          paymentData,
          config
        );
        const client_secret = data.client_secret;

        if (!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement)!,
            billing_details: {
              name: user?.name,
              email: user?.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.city,
                postal_code: String(shippingInfo.pinCode),
                country: shippingInfo.country,
              },
            },
          },
        });

        if (result.error) {
          payBtn.current.disabled = false;
          toast.error(result.error.message, {
            position: "bottom-center",
          });
        } else {
          if (result.paymentIntent.status === "succeeded") {
            const order: Order = {
              shippingInfo,
              orderItems,
              itemsPrice: orderInfo.subtotal,
              taxPrice: orderInfo.tax,
              shippingPrice: orderInfo.shippingCharges,
              totalPrice: orderInfo.totalPrice,
              paymentInfo: {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
              },
            };
            dispatch(createOrder(order))
              .unwrap()
              .then(() => {
                navigate("/success"); // navigate on success
              });
          } else {
            toast.error("There's some issue while processing payment", {
              position: "bottom-center",
            });
          }
        }
      } catch (error) {
        payBtn.current.disabled = false;
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message || error.message, {
            position: "bottom-center",
          });
        }
      }
    }
  };

  return (
    <>
      <HelmetData title="Payment" />
      <CheckOutStep activeStep={2} />
      <div className="paymentContainer">
        <form onSubmit={handleSubmit} className="paymentForm">
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
