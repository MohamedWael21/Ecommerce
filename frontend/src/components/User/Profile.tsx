import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import HelmetData from "../layout/HelmetData";
import Loader from "../layout/Loader/Loader";

import "./profile.css";
function formateDate(dateStr: string | undefined) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
const Profile = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HelmetData title={`${user?.name}'s Profile`} />
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src={user?.avatar?.url || "/Profile.png"} alt={user?.name} />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user?.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user?.email}</p>
          </div>
          <div>
            <h4>Joined on</h4>
            <p>{formateDate(user?.createdAt)}</p>
          </div>
          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
