import express from "express";
import {
  deleteUser,
  forgetPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controllers/users";
import { authorizeRoles, isAuthUser } from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/password/forgot", forgetPassword);
router.post("/password/reset/:token", resetPassword);
router.get("/me", isAuthUser, getUserDetails);
router.put("/password/update", isAuthUser, updatePassword);
router.put("/me/update", isAuthUser, updateProfile);
router.get("/admin/users", isAuthUser, authorizeRoles("admin"), getAllUsers);
router.get(
  "/admin/users/:id",
  isAuthUser,
  authorizeRoles("admin"),
  getSingleUser
);
router.delete(
  "/admin/users/:id",
  isAuthUser,
  authorizeRoles("admin"),
  deleteUser
);
router.put(
  "/admin/users/:id",
  isAuthUser,
  authorizeRoles("admin"),
  updateUserRole
);
export default router;
