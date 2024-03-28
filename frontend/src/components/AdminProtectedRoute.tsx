import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const AdminProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.user);
  return user?.role === "admin" ? <Outlet /> : "You are not Authorized";
};

export default AdminProtectedRoute;
