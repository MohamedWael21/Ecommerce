import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Product } from "../../types/models";
import { useEffect, useState } from "react";
import { getProductDetails, reviewProduct } from "../../redux/thunks/products";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import HelmetData from "../layout/HelmetData";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  RatingProps,
} from "@mui/material";
import { clearProductError } from "../../redux/slices/productSlice";
import { clearError, resetReview } from "../../redux/slices/reviewSlice";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product: Product | null = useAppSelector(
    (state) => state.product.product
  );
  const { loading, error } = useAppSelector((state) => state.product);
  const { success, error: reviewError } = useAppSelector(
    (state) => state.review
  );
  const [quantity, setQuantity] = useState(0);
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    setOpen((prev) => !prev);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  };
  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, product?.stock as number));
  };

  const addToCartHandler = () => {
    if (!quantity) {
      toast.warn("You need at least to choose one item", {
        position: "bottom-center",
      });
      return;
    }
    if (product) {
      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          quantity,
          stock: product.stock,
        })
      );
      toast.success("Item Added to Cart", {
        position: "bottom-center",
      });
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearProductError());
    }
    if (reviewError) {
      toast.error(reviewError, {
        position: "bottom-center",
      });
      dispatch(clearError());
    }

    if (success) {
      toast.success("Review Submitted Successfully", {
        position: "bottom-center",
      });
      dispatch(resetReview());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, toast, reviewError, success]);

  const ratingOptions: RatingProps = {
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
    size: "medium",
  };

  const reviewSubmitHanlder = () => {
    if (id) {
      dispatch(reviewProduct({ id, comment, rating }));
    }
    setOpen(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HelmetData title={`${product?.name}--ECOMMERCE`} />
          <div className="productDetails">
            <div>
              <div className="imges-container">
                <Carousel>
                  {product?.images.map((item, index) => (
                    <img
                      src={item.url}
                      alt={`${index} Slide`}
                      key={item.url}
                      className="CarousalImage"
                    />
                  ))}
                </Carousel>
              </div>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product?.name}</h2>
                <p>Product # {product?._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...ratingOptions} />
                <span className="detailsBlock-2-span">
                  ({product?.numOfReviews}) Reviews
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`$${product?.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product ? product.stock < 1 : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  {product && (
                    <b
                      className={product.stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product?.stock < 1 ? "outOfStock" : "InStock"}
                    </b>
                  )}
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product?.description}</p>
              </div>
              <button onClick={() => setOpen(true)} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(_, newValue) => setRating(newValue!)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols={30}
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="error">
                Cancel
              </Button>
              <Button color="primary" onClick={reviewSubmitHanlder}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product?.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard review={review} key={review._id} />
              ))}
            </div>
          ) : (
            <div className="noReviews">No Reviews Yet</div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
