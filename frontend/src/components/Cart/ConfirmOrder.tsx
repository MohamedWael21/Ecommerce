import { Typography } from "@mui/material";
import { useAppSelector } from "../../redux/store";
import HelmetData from "../layout/HelmetData";
import CheckOutStep from "./CheckOutStep";
import { Link, useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import "./confirmOrder.css";
import Shipping from "./Shipping";
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  if (!shippingInfo.address) {
    return <Shipping />;
  }
  const subtotal = cartItems.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.13;
  const totalPrice = tax + subtotal + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${
    State.getStateByCodeAndCountry(shippingInfo.state, shippingInfo.country)
      ?.name
  }, ${shippingInfo.pinCode}, ${
    Country.getCountryByCode(shippingInfo.country)?.name
  }`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <>
      <HelmetData title="Confirm Order" />
      <CheckOutStep activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Item</Typography>
            <div className="confirmCartItemContainer">
              {cartItems.map((item) => (
                <div key={item.productId}>
                  <img src={item.image} alt="product image" />
                  <Link to={`/product/${item.productId}`}>{item.name}</Link>
                  <span>
                    {item.quantity} X ${item.price} ={" "}
                    <b>${item.quantity * item.price}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>Tax:</p>
                <span>${tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
