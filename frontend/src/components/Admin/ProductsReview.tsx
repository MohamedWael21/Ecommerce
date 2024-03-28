import React, { Fragment, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./productReviews.css";
import HelmetData from "../layout/HelmetData";

import SideBar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  deleteReview,
  getAllReviewsOfProduct,
} from "../../redux/thunks/products";
import {
  clearError as clearDeleteReviewError,
  resetState,
} from "../../redux/slices/deleteReviewSlice";
import { toast } from "react-toastify";
import { clearError as clearProductReviewError } from "../../redux/slices/productsReviewSlice";
import { Button } from "@mui/material";
import { Delete, Star } from "@mui/icons-material";

const ProductReviews = () => {
  const dispatch = useAppDispatch();
  const [productId, setProductId] = useState("");

  const { error: deleteError, isDeleted } = useAppSelector(
    (state) => state.deleteReview
  );

  const { error, reviews, loading } = useAppSelector(
    (state) => state.productReview
  );

  const deleteReviewHandler = (reviewId: string) => {
    dispatch(deleteReview({ id: reviewId, productId }));
  };

  const productReviewsSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getAllReviewsOfProduct(productId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductReviewError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearDeleteReviewError());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      dispatch(resetState());
      dispatch(getAllReviewsOfProduct(productId));
    }
  }, [dispatch, error, deleteError, isDeleted]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
      },
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
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows: { id: string; rating: number; comment: string; user: string }[] =
    [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <HelmetData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
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
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
