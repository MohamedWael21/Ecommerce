import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import HelmetData from "../layout/HelmetData";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./productList.css";
import {
  clearError,
  resetState,
} from "../../redux/slices/updateDeleteOrderSlice";
import { clearError as clearAllOrderError } from "../../redux/slices/allOrderSlice";
import { deleteOrder, getAllOrders } from "../../redux/thunks/order";

const OrderList = () => {
  const dispatch = useAppDispatch();

  const { error, orders } = useAppSelector((state) => state.orders);
  const { error: deleteError, isDeleted } = useAppSelector(
    (state) => state.updateDeleteOrder
  );

  const navigate = useNavigate();

  const deleteOrderHandler = (id: string) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearAllOrderError());
    }
    if (deleteError) {
      toast.error(deleteError, {
        position: "bottom-center",
      });
      dispatch(clearError());
    }
    if (isDeleted) {
      toast.success("Order Deleted Successfully", {
        position: "bottom-center",
      });
      dispatch(resetState());
      navigate("/admin/dashboard");
    }

    dispatch(getAllOrders());
  }, [error, toast, dispatch, deleteError, isDeleted]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order Id", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.row.id}`}>
              <Edit />
            </Link>

            <Button onClick={() => deleteOrderHandler(params.row.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: {
    id: string;
    itemQty: number;
    status: string;
    amount: number;
  }[] = [];

  orders.forEach((order) => {
    rows.push({
      itemQty: order.orderItems.length,
      id: order._id!,
      status: order.orderStatus!,
      amount: order.totalPrice,
    });
  });

  return (
    <>
      <HelmetData title="ALL ORDERS - ADMIN" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 className="productListHeading">All Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default OrderList;
