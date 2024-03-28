import { Fragment, useEffect } from "react";
import "./productList.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import SideBar from "./Sidebar";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { deleteUser, getAllUsers } from "../../redux/thunks/users";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { clearError as clearUsersError } from "../../redux/slices/allUserSlice";
import {
  clearError as clearDeleteError,
  resetState,
} from "../../redux/slices/profileSlice";
import HelmetData from "../layout/HelmetData";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error: usersError, users } = useAppSelector((state) => state.users);

  const { error: deleteError, isDeleted } = useAppSelector(
    (state) => state.profile
  );

  const deleteUserHandler = (id: string) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (usersError) {
      toast.error(usersError, {
        position: "bottom-center",
      });
      dispatch(clearUsersError());
    }

    if (deleteError) {
      toast.error(deleteError, {
        position: "bottom-center",
      });
      dispatch(clearDeleteError());
    }

    if (isDeleted) {
      toast.success("User Deleted Successfully", {
        position: "bottom-center",
      });
      navigate("/admin/users");
      dispatch(resetState());
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, usersError, deleteError, isDeleted]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "greenColor" : "redColor";
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
            <Link to={`/admin/user/${params.row.id}`}>
              <Edit />
            </Link>

            <Button onClick={() => deleteUserHandler(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows: {
    id: string;
    role: string;
    email: string;
    name: string;
  }[] = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <HelmetData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 className="productListHeading">ALL USERS</h1>

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
    </Fragment>
  );
};

export default UsersList;
