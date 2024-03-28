import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { clearError } from "../../redux/slices/orderDetailsSlice";
import { getOrderDetails } from "../../redux/thunks/order";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import HelmetData from "../layout/HelmetData";
import { Typography } from "@mui/material";
import { Country, State } from "country-state-city";
import { Link } from "react-router-dom";
import "./ordeDetails.css";
const OrderDetails = () => {
  const { order, error, loading } = useAppSelector(
    (state) => state.orderDetails
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearError());
    }
    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [error, dispatch, toast]);

  let address = "";
  if (order) {
    address = `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${
      State.getStateByCodeAndCountry(
        order.shippingInfo.state,
        order.shippingInfo.country
      )?.name
    }, ${order.shippingInfo.pinCode}, ${
      Country.getCountryByCode(order.shippingInfo.country)?.name
    }`;
  }
  return (
    <>
      <HelmetData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <Typography component="h1">Order #{order?._id}</Typography>
            <Typography>Shipping Info</Typography>

            <div className="orderDetailsContainerBox">
              <div>
                <p>Name:</p>
                <span>{order?.user?.name}</span>
              </div>
              <div>
                <p>Phone</p>
                <span>{order?.shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>

            <Typography>Payment</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order?.paymentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order?.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>

              <div>
                <p>Amount</p>
                <span>{order?.totalPrice}</span>
              </div>
            </div>

            <Typography>Order Status</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order?.paymentInfo.status === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order?.orderStatus}
                </p>
              </div>
            </div>
          </div>
          <div className="orderDetailsCartItems">
            <Typography>Order Items</Typography>
            <div className="orderDetailsCartItemsContainer">
              {order?.orderItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product image" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>
                    {item.quantity} X {item.price} ={" "}
                    <b>${item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
