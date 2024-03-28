import { Face, LockOutlined, MailOutline } from "@mui/icons-material";
import "./auth.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { login, register } from "../../redux/thunks/users";
import { toast } from "react-toastify";
import Loader from "../layout/Loader/Loader";
import { clearError } from "../../redux/slices/userSlice";
import PasswordField from "../PasswordField";
const Auth = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const switcherTab = useRef<HTMLButtonElement>(null);
  const registerTab = useRef<HTMLFormElement>(null);
  const loginTab = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const { name, email, password } = user;

  const dispatch = useAppDispatch();
  const { error, loading, isAuthenticated } = useAppSelector(
    (state) => state.user
  );
  const redirect = `${searchParams.get("redirect") || "account"}`;
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
    return () => {
      dispatch(clearError());
    };
  }, [error, toast, isAuthenticated]);

  const switchTab = (
    _: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    tab: string
  ) => {
    if (tab === "login") {
      switcherTab.current?.classList.add("shiftToNeutral");
      switcherTab.current?.classList.remove("shiftToRight");

      registerTab.current?.classList.remove("shiftToNeutralForm");
      loginTab.current?.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current?.classList.add("shiftToRight");
      switcherTab.current?.classList.remove("shiftToNeutral");

      registerTab.current?.classList.add("shiftToNeutralForm");
      loginTab.current?.classList.add("shiftToLeft");
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "avatar" && e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar!);
    dispatch(register(myForm));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTab(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTab(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form
              className="loginForm"
              ref={loginTab}
              onSubmit={handleLoginSubmit}
            >
              <div className="loginEmail">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOutlined />
                <PasswordField
                  changeHandler={(e) => setLoginPassword(e.target.value)}
                  value={loginPassword}
                  placeholder="Password"
                />
              </div>
              <Link to="/password/forgot">Forget Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={handleSignupSubmit}
            >
              <div className="signupName">
                <Face />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="signEmail">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="singupPassword">
                <LockOutlined />
                <PasswordField
                  changeHandler={handleRegisterChange}
                  value={password}
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleRegisterChange}
                />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
