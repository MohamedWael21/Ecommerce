import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Loader from "../layout/Loader/Loader";
import { getAllProducts } from "../../redux/thunks/products";
import { toast } from "react-toastify";
import ProductCard from "../Home/ProductCard";
import "./products.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";
import HelmetData from "../layout/HelmetData";

export const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const { keyword } = useParams();
  const {
    loading,
    products,
    error,
    productsCount,
    resultPerPage,
    filterdProductsCount,
  } = useAppSelector((state) => state.product);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePriceChange = (_: Event, price: number | number[]) => {
    setPrice(price as number[]);
  };
  const handleRatingChange = (_: Event, rating: number | number[]) => {
    setRating(rating as number);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts({ keyword, currentPage, price, category, rating }));
  }, [dispatch, keyword, currentPage, price, category, rating]);
  if (error) {
    toast.error(error, {
      position: "bottom-center",
    });
    return;
  }
  const counts = filterdProductsCount;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HelmetData title="PRODUCTS--ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
              size="small"
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Rating Above</Typography>
              <Slider
                value={rating}
                onChange={handleRatingChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={5}
                size="small"
              />
            </fieldset>
          </div>
          {resultPerPage < counts && (
            <div className="paginatorBox">
              <Pagination
                activePage={currentPage}
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={handlePageChange}
                nextPageText="next"
                prevPageText="prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
