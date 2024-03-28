import { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import HelmetData from "../layout/HelmetData";

import { Verified, Person, Mail } from "@mui/icons-material";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getUserDetails, updateUser } from "../../redux/thunks/users";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError as clearUserError } from "../../redux/slices/userDetailsSlice";
import {
  clearError as clearUpdateError,
  resetState,
} from "../../redux/slices/profileSlice";

const UpdateUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error: userError,
    user,
  } = useAppSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useAppSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (((user && user._id !== id) || !user) && id) {
      dispatch(getUserDetails(id));
    } else {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    }
    if (userError) {
      toast.error(userError, {
        position: "bottom-center",
      });
      dispatch(clearUserError());
    }

    if (updateError) {
      toast.error(updateError, {
        position: "bottom-center",
      });
      dispatch(clearUpdateError());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully", {
        position: "bottom-center",
      });
      navigate("/admin/users");
      dispatch(resetState());
    }
  }, [dispatch, userError, id, isUpdated, updateError, user]);

  const updateUserSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    if (id) {
      dispatch(updateUser({ id, data: myForm }));
    }
  };

  return (
    <Fragment>
      <HelmetData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <Person />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Mail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Verified />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="" hidden>
                    Choose Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
