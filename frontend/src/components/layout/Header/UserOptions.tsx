import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import { User } from "../../../types/models";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { logout } from "../../../redux/thunks/users";
import { ShoppingCart } from "@mui/icons-material";

interface UserOptionsProps {
  user: User;
}
const UserOptions = ({ user }: UserOptionsProps) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const goToOrders = () => {
    navigate("/orders/me");
  };
  const goToAccount = () => {
    navigate("/account");
  };
  const goToDashboard = () => {
    navigate("/admin/dashboard");
  };
  const goToCart = () => {
    navigate("/cart");
  };
  const logoutUser = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logout Successfully", {
          position: "bottom-center",
        });
      })
      .catch((error) => {
        toast.error(`Logout Failed: ${error}`, {
          position: "bottom-center",
        });
      });
  };
  const options = [
    { icon: <CiViewList />, name: "Orders", action: goToOrders },
    { icon: <IoPersonOutline />, name: "Profile", action: goToAccount },
    {
      icon: (
        <ShoppingCart sx={{ color: cartItems.length ? "tomato" : "unset" }} />
      ),
      name: `Cart (${cartItems.length})`,
      action: goToCart,
    },
    { icon: <MdExitToApp />, name: "Logout", action: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "DashBoard",
      action: goToDashboard,
    });
  }

  return (
    <>
      <Backdrop open={open} sx={{ zIndex: "10" }} />
      <SpeedDial
        sx={{ width: "56px", height: "56px" }}
        ariaLabel="user tooltip"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar?.url || "Profile.png"}
            alt="Profile"
          />
        }
        className="speedDial"
        direction="down"
      >
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.action}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
