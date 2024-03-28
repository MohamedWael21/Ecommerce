import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Loader from "../layout/Loader/Loader";
import HelmetData from "../layout/HelmetData";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearError } from "../../redux/slices/myOrdersSlice";
import { getMyOrders } from "../../redux/thunks/order";
import { Link } from "react-router-dom";
import { Launch } from "@mui/icons-material";
import "./myOrders.css";

const MyOrders = () => {
  const { loading, error, orders } = useAppSelector((state) => state.myOrders);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
          <Link to={`/order/${params.row.id}`}>
            <Launch />
          </Link>
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

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearError());
    }
    dispatch(getMyOrders());
  }, [error, dispatch, toast]);
  return (
    <>
      <HelmetData title={`${user?.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
