import { Fragment, useEffect, useState } from "react";
import HelmetData from "../layout/HelmetData";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import { AccountTree } from "@mui/icons-material";
import { clearError as clearOrderDetailError } from "../../redux/slices/orderDetailsSlice";
import {
  clearError as clearUpdateError,
  resetState,
} from "../../redux/slices/updateDeleteOrderSlice";
import "./processOrder.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getOrderDetails, updateOrder } from "../../redux/thunks/order";
import { toast } from "react-toastify";
const ProcessOrder = () => {
  const { order, error, loading } = useAppSelector(
    (state) => state.orderDetails
  );
  const { error: updateError, isUpdated } = useAppSelector(
    (state) => state.updateDeleteOrder
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const updateOrderSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      dispatch(updateOrder({ id, status }));
    }
  };

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearOrderDetailError());
    }
    if (updateError) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearUpdateError());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully", {
        position: "bottom-center",
      });
      dispatch(resetState());
    }
    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <HelmetData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading || !order ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmShippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTree />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="" hidden>
                        Choose Category
                      </option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
