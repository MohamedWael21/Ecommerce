import { CheckCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./orderSuccess.css";
const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircle />
      <Typography>Your Order Has been Placed successfully</Typography>
      <Link to="/orders/me">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
