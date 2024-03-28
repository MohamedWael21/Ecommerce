import "./updateProfile.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loadUser } from "../../redux/thunks/users";
import { useNavigate } from "react-router-dom";
import { clearError, resetState } from "../../redux/slices/profileSlice";
import { Face, MailOutline } from "@mui/icons-material";
import HelmetData from "../layout/HelmetData";
import Loader from "../layout/Loader/Loader";
import { updateProfile } from "../../redux/thunks/profile";
const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const { error, isUpdated, loading } = useAppSelector(
    (state) => state.profile
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    `${user?.avatar?.url || "/Profile.png"}`
  );
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully", {
        position: "bottom-center",
      });
      dispatch(loadUser());
      dispatch(resetState());
      navigate("/account");
    }
    return () => {
      dispatch(clearError());
    };
  }, [error, isUpdated, dispatch, navigate]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "avatar" && e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name!);
    myForm.set("email", email!);
    myForm.set("avatar", avatar!);
    dispatch(updateProfile(myForm));
  };

  return (
    <>
      <HelmetData title="Update Profile" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="updateProfileName">
                  <Face />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="updateProfileEmail">
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
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
