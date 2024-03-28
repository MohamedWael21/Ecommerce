import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePassword } from "../../redux/thunks/profile";
import { clearError, resetState } from "../../redux/slices/profileSlice";
import Loader from "../layout/Loader/Loader";
import HelmetData from "../layout/HelmetData";
import { LockOpen, LockOutlined, VpnKey } from "@mui/icons-material";
import "./updatePassword.css";
import PasswordField from "../PasswordField";
const UpdatePassword = () => {
  const { error, isUpdated, loading } = useAppSelector(
    (state) => state.profile
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }
    if (isUpdated) {
      toast.success("Password Updated Successfully", {
        position: "bottom-center",
      });
      dispatch(resetState());
      navigate("/account");
    }
    return () => {
      dispatch(clearError());
    };
  }, [error, isUpdated, dispatch, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };

  return (
    <>
      <HelmetData title="Change Password" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Change Password</h2>
              <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="updatePassword">
                  <VpnKey />
                  <PasswordField
                    changeHandler={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    placeholder="Old Password"
                  />
                </div>
                <div className="updatePassword">
                  <LockOpen />
                  <PasswordField
                    changeHandler={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    placeholder="New Password"
                  />
                </div>
                <div className="updatePassword">
                  <LockOutlined />
                  <PasswordField
                    changeHandler={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
