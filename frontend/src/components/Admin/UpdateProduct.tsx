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
import {
  clearError,
  resetState,
} from "../../redux/slices/updateDeleteProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails, updateProduct } from "../../redux/thunks/products";
import { categories } from "../Product/Products";
import {
  clearProductError,
  resetProductState,
} from "../../redux/slices/productSlice";
import "./newProduct.css";
import Loader from "../layout/Loader/Loader";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImages, setOldImages] = useState<{ url: string }[]>([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { loading, error, isUpdated } = useAppSelector(
    (state) => state.updateDeleteProduct
  );

  const {
    product,
    loading: productLoading,
    error: productError,
  } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(String(product.price));
      setDescription(product.description);
      setStock(String(product.stock));
      setCategory(product.category);
      setOldImages(product.images);
    }

    if (productError) {
      toast.error(productError, {
        position: "bottom-center",
      });
      dispatch(clearProductError());
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearError());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully", {
        position: "bottom-center",
      });
      dispatch(resetState());
      dispatch(resetProductState());
      navigate("/admin/dashboard");
    }
  }, [error, isUpdated, dispatch, navigate, id, product, productError]);

  const createProductSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();

    form.set("name", name);
    form.set("price", price);
    form.set("description", description);
    form.set("stock", stock);
    form.set("category", category);

    images.forEach((image: string) => {
      form.append("images", image);
    });
    if (id) {
      dispatch(updateProduct({ product: form, id }));
    }
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
      {productLoading ? (
        <Loader />
      ) : (
        <>
          <HelmetData title="Update Product" />
          <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
              <form
                className="createProductForm"
                onSubmit={createProductSubmitHandler}
              >
                <h1>Update Product</h1>
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
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
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
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
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
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
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
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt="Old Product Preview"
                      />
                    ))}
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
                  Update
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
