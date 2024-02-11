import { ReactNavbar } from "overlay-navbar";
import { FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { BsPersonSquare } from "react-icons/bs";
import logo from "../../../images/logo.png";
import "./header.css";
const options = {
  burgerColorHover: "#eb4034",
  logo,
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  SearchIconElement: FaSearch,
  ProfileIconElement: BsPersonSquare,
  CartIconElement: FiShoppingBag,
  searchIcon: true,
  cartIcon: true,
  profileIcon: true,
  searchIconSize: "1rem",
  cartIconSize: "1rem",
  profileIconSize: "1rem",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
