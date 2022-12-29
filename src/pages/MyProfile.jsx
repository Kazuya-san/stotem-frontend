import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, reset, deleteAccount } from "../redux/authSlice";
import Loader from "../components/Loader";
import shot from "../assets/shooting-photo.jpg";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import UpdateProfile from "../components/UpdateProfile";

const MyProfile = () => {
  const { loading, user, isAuthenticated, error, isError, updateSuccess } =
    useSelector((state) => state.auth);

  const [imageLoading, setImageLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (isError) {
      alert(error);
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    } else if (updateSuccess) {
      dispatch(reset());
    }
  }, [isAuthenticated, isError, updateSuccess, navigate]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const handleDelete = () => {
    let confirm = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirm) {
      dispatch(deleteAccount());
    }
  };

  if (loading) {
    return (
      <div className="h-[78.8vh] flex justify-center items-cente">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center"
      style={{
        background:
          "linear-gradient(180deg, #FCEBE1 0%, #F3E5F2 35%, #FFCAD0 100%)",
        minHeight: "78.8vh",
      }}
    >
      <div className="flex flex-col mt-5 items-start justify-start w-full md:w-5/6">
        <h1 className="text-4xl ml-3 font-bold mb-12 uppercase italic flex items-center text-[#355070]">
          <span className="mr-4">My Account</span>
          <FaEdit
            className="cursor-pointer"
            size={30}
            onClick={() => {
              setShowEdit(!showEdit);
            }}
          />
        </h1>
        {!showEdit && (
          <div className="flex md:flex-row w-full md:w-2/6 flex-col items-center justify-between">
            <div>
              {imageLoading && (
                <div className="flex items-center justify-center h-full">
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                </div>
              )}
              <img
                src={
                  user?.profilePicture !== "sample" && user?.profilePicture
                    ? user.profilePicture
                    : shot
                }
                onLoad={() => setImageLoading(false)}
                style={{ display: imageLoading ? "none" : "block" }}
                alt="profile"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
            <div className="md:ml-24 text-center md:text-left">
              {!showEdit && (
                <>
                  <h1
                    className="text-2xl mt-2"
                    style={{ letterSpacing: "2px" }}
                  >
                    {user.name}
                  </h1>
                  <h1 className="text-xl mt-2" style={{ letterSpacing: "2px" }}>
                    {user.email}
                  </h1>
                </>
              )}
            </div>
          </div>
        )}
        {!showEdit && (
          <div className="flex flex-col w-full md:w-1/12 items-center justify-center">
            <button
              onClick={handleDelete}
              className="bg-[#E56B6F] text-white px-4 py-2 rounded-full mt-5 w-40"
            >
              Delete Account
            </button>
          </div>
        )}
        {showEdit && <UpdateProfile user={user} setShowEdit={setShowEdit} />}
      </div>
    </div>
  );
};

export default MyProfile;
