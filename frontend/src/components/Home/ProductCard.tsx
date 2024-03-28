import { Link } from "react-router-dom";
import { Product } from "../../types/models";
import { Rating, RatingProps } from "@mui/material";
interface ProductCardProp {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProp) => {
  const ratingOptions: RatingProps = {
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
    size: "small",
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      {/* <img src="https:i.ibb.co/DRST11n/1.webp" alt="" /> */}
      <p>{product.name}</p>
      <div>
        <Rating {...ratingOptions} />{" "}
        <span className="productCardSpan">
          ({product.reviews.length} Reviews)
        </span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
