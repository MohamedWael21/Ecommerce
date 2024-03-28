import {
  AccountTree,
  AttachMoney,
  Description,
  Spellcheck,
  Storage,
} from "@mui/icons-material";
import HelmetData from "../layout/HelmetData";
import Sidebar from "./Sidebar";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { clearError, resetState } from "../../redux/slices/newProductSlice";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/thunks/products";
import { categories } from "../Product/Products";
import "./newProduct.css";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(
    (state) => state.newProduct
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearError());
    }

    if (success) {
      toast.success("Product Created Successfully", {
        position: "bottom-center",
      });
      dispatch(resetState());
      navigate("/admin/dashboard");
    }
  }, [error, success, dispatch, navigate]);

  const createProductSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();

    form.set("name", name);
    form.set("price", String(price));
    form.set("description", name);
    form.set("stock", String(stock));
    form.set("category", category);

    images.forEach((image: string) => {
      form.append("images", image);
    });

    dispatch(createProduct(form));
  };

  const createProductImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files!);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result as string]);
          setImages((prev) => [...prev, reader.result as string]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <HelmetData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <Spellcheck />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div>
              <AttachMoney />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div>
              <Description />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols={30}
                rows={1}
              ></textarea>
            </div>

            <div>
              <AccountTree />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="" hidden>
                  Choose Category
                </option>
                {categories.map((cate) => (
                  <option key={cate} value={cate.toLowerCase()}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Storage />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
