import { MailOutline } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import HelmetData from "../layout/HelmetData";
import Loader from "../layout/Loader/Loader";
import { useEffect, useState } from "react";
import "./forgetPassword.css";
import { forgetPassword } from "../../redux/thunks/forgetPassword";
import { toast } from "react-toastify";
import { resetState } from "../../redux/slices/forgetPasswordSlice";
const ForgetPassword = () => {
  const { loading, error, message } = useAppSelector(
    (state) => state.forgetPassword
  );
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }
    if (message) {
      toast.success(message, {
        position: "bottom-center",
      });
      dispatch(resetState());
    }

    return () => {
      dispatch(resetState());
    };
  }, [error, dispatch, message]);

  return (
    <>
      <HelmetData title="Forgot Password" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="forgetPasswordContainer">
            <div className="forgetPasswordBox">
              <h2 className="forgetPasswordHeading">Forgot Password</h2>
              <form
                className="forgetPasswordForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="forgetPasswordEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="forgetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgetPassword;
