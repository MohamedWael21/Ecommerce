import { Link } from "react-router-dom";
import "./cartItemCard.css";
import { useDispatch } from "react-redux";
import { reomoveFromCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
interface CartItemCardProp {
  item: {
    name: string;
    price: number;
    productId: string;
    image: string;
  };
}
const CartItemCard = ({ item }: CartItemCardProp) => {
  const dispatch = useDispatch();
  const remove = (productId: string) => {
    dispatch(reomoveFromCart(productId));
    toast.success("Removed From Cart", {
      position: "bottom-center",
    });
  };
  return (
    <div className="cartItemCard">
      <img src={item.image} alt="item picture" />
      <div>
        <Link to={`/product/${item.productId}`}>{item.name}</Link>
        <span>{`Price: $${item.price}`}</span>
        <p onClick={() => remove(item.productId)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
