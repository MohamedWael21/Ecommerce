import { useEffect, useState } from "react";
import HelmetData from "../layout/HelmetData";
import Loader from "../layout/Loader/Loader";
import { LockOpen, LockOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./resetPassword.css";
import { toast } from "react-toastify";
import { resetState } from "../../redux/slices/forgetPasswordSlice";
import { resetPassword } from "../../redux/thunks/forgetPassword";
import { useNavigate, useParams } from "react-router-dom";
import PasswordField from "../PasswordField";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const { loading, error, success } = useAppSelector(
    (state) => state.forgetPassword
  );
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resetToken) {
      dispatch(resetPassword({ resetToken, password, confirmPassword }));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }
    if (success) {
      toast.success("Password Updated Successfully", {
        position: "bottom-center",
      });
      dispatch(resetState());
      navigate("/login");
    }

    return () => {
      dispatch(resetState());
    };
  }, [error, dispatch, success]);
  return (
    <>
      <HelmetData title="Change Password" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Change Password</h2>
              <form
                className="resetPasswordForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div>
                  <LockOpen />
                  <PasswordField
                    changeHandler={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="New Password"
                  />
                </div>
                <div>
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
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
