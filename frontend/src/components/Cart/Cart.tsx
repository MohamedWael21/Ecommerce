import { RemoveShoppingCart } from "@mui/icons-material";
import { addToCart } from "../../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { CartItem } from "../../types/models";
import HelmetData from "../layout/HelmetData";
import CartItemCard from "./CartItemCard";
import "./cart.css";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const increaseQuantity = (item: CartItem) => {
    const newQty = item.quantity + 1;
    if (item.stock < newQty) return;
    const newItem = { ...item, quantity: newQty };
    dispatch(addToCart(newItem));
  };
  const decreaseQuanity = (item: CartItem) => {
    const newQty = item.quantity - 1;
    if (!newQty) return;
    const newItem = { ...item, quantity: newQty };
    dispatch(addToCart(newItem));
  };

  const totalPrice = cartItems.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0
  );

  const handleCheckOut = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <HelmetData title="Cart" />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCart />
          <Typography> No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>SubTotal</p>
          </div>
          {cartItems.map((item) => (
            <div className="cartContainer" key={item.productId}>
              <CartItemCard item={item} />
              <div className="cartInput">
                <button onClick={() => decreaseQuanity(item)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => increaseQuantity(item)}>+</button>
              </div>
              <p className="cartSubTotal">{`$${item.quantity * item.price}`}</p>
            </div>
          ))}

          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>${totalPrice}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={handleCheckOut}>Check Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
