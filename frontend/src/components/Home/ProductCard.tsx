import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { Product } from "../../types/models";
interface ProductCardProp {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProp) => {
  const reactStarsOptions = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    value: product.rating,
    isHalf: true,
    size: 15,
  };

  return (
    <Link className="productCard" to={product._id}>
      {/* <img src={product.images[0].url} alt={product.name} /> */}
      <img src="https:i.ibb.co/DRST11n/1.webp" alt="" />
      <p>{product.name}</p>
      <div>
        <ReactStars {...reactStarsOptions} /> <span>(256 Reviews)</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
