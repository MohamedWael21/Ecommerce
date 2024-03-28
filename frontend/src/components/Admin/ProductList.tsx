import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import HelmetData from "../layout/HelmetData";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearProductError } from "../../redux/slices/productSlice";
import { deletProduct, getAdminProducts } from "../../redux/thunks/products";
import "./productList.css";
import {
  clearError,
  resetState,
} from "../../redux/slices/updateDeleteProductSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();

  const { error, products } = useAppSelector((state) => state.product);
  const { error: deleteError, isDeleted } = useAppSelector(
    (state) => state.updateDeleteProduct
  );

  const navigate = useNavigate();

  const deleteProductHandler = (id: string) => {
    dispatch(deletProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearProductError());
    }
    if (deleteError) {
      toast.error(deleteError, {
        position: "bottom-center",
      });
      dispatch(clearError());
    }
    if (isDeleted) {
      toast.success("Deleted Successfully", {
        position: "bottom-center",
      });
      dispatch(resetState());
      navigate("/admin/dashboard");
    }

    dispatch(getAdminProducts());
  }, [error, toast, dispatch, deleteError, isDeleted]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.row.id}`}>
              <Edit />
            </Link>

            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: {
    id: string;
    stock: number;
    price: number;
    name: string;
  }[] = [];

  products.forEach(({ name, _id, stock, price }) =>
    rows.push({ id: _id, stock, price, name })
  );

  return (
    <>
      <HelmetData title="ALL PRODUCTS - ADMIN" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 className="productListHeading">All Products</h1>
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

export default ProductList;
