import { CgMouse } from "react-icons/cg";
import "./home.css";
import ProductCard from "./ProductCard";
import HelmetData from "../layout/HelmetData";
import { getAllProducts } from "../../redux/thunks/products";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts({}));
  }, [dispatch]);
  const { products, loading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    toast.error(error, {
      position: "bottom-center",
    });
  }, [error, toast]);
  return (
    <>
      <HelmetData title="HOME PAGE" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>Find Amazing Products Below</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products.length &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
