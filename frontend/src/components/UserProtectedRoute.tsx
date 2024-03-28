import { useAppSelector } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
const UserProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default UserProtectedRoute;
