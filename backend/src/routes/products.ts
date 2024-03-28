import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getProduct,
  getProductReview,
  updateProduct,
} from "../controllers/products";
import { isAuthUser, authorizeRoles } from "../middleware/auth";

const router = express.Router();

router.get("/products", getAllProducts);

router.get(
  "/admin/products",
  isAuthUser,
  authorizeRoles("admin"),
  getAdminProducts
);

router.post("/products", isAuthUser, authorizeRoles("admin"), createProduct);
router.put("/products/:id", isAuthUser, authorizeRoles("admin"), updateProduct);
router.delete(
  "/products/:id",
  isAuthUser,
  authorizeRoles("admin"),
  deleteProduct
);
router.get("/products/:id", getProduct);
router.put("/review/:productId", isAuthUser, createProductReview);
router.get("/reviews/:id", getProductReview);
router.delete("/reviews", isAuthUser, deleteReview);

export default router;
