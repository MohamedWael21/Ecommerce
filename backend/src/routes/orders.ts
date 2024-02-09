import expres from "express";
import { authorizeRoles, isAuthUser } from "../middleware/auth";
import {
  createOrder,
  deleteOrder,
  getAllOrdes,
  getOrder,
  myOrders,
  updateOrder,
} from "../controllers/orders";

const router = expres.Router();
router.post("/orders", isAuthUser, createOrder);
router.get("/order/:id", isAuthUser, getOrder);
router.get("/orders/me", isAuthUser, myOrders);

router.get("/admin/orders", isAuthUser, authorizeRoles("admin"), getAllOrdes);
router.put(
  "/admin/order/:id",
  isAuthUser,
  authorizeRoles("admin"),
  updateOrder
);
router.delete(
  "/admin/order/:id",
  isAuthUser,
  authorizeRoles("admin"),
  deleteOrder
);
export default router;
