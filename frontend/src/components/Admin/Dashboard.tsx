import { Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { getAdminProducts } from "../../redux/thunks/products";
import { clearProductError } from "../../redux/slices/productSlice";
import { toast } from "react-toastify";
import { getAllOrders } from "../../redux/thunks/order";
import { clearError as clearOrderError } from "../../redux/slices/allOrderSlice";
import { clearError as clearUserError } from "../../redux/slices/allUserSlice";
import { getAllUsers } from "../../redux/thunks/users";

const Dashboard = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  const dispatch = useAppDispatch();
  const { error: productsError, products } = useAppSelector(
    (state) => state.product
  );
  const { error: ordersError, orders } = useAppSelector(
    (state) => state.orders
  );
  const { error: usersError, users } = useAppSelector((state) => state.users);
  useEffect(() => {
    if (productsError) {
      toast.error(productsError, {
        position: "bottom-center",
      });
      dispatch(clearProductError());
    }
    if (ordersError) {
      toast.error(ordersError, {
        position: "bottom-center",
      });
      dispatch(clearOrderError());
    }
    if (usersError) {
      toast.error(usersError, {
        position: "bottom-center",
      });
      dispatch(clearUserError());
    }
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [productsError, ordersError, usersError, toast, dispatch]);

  const outOfStock = products.reduce(
    (prev, { stock }) => (prev = prev + Number(stock == 0)),
    0
  );
  const inStock = products.length - outOfStock;

  const lineState = {
    labels: ["Inital amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, inStock],
      },
    ],
  };

  const totalAmount = orders.reduce(
    (prev, order) => order.totalPrice + prev,
    0
  );
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ${totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
