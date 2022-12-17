import { useState, useEffect } from "react";
import games from "../assets/games.jpg";
import ski from "../assets/ski.jpg";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import jwtDecode from "jwt-decode";
import { NavLink } from "react-router-dom";
import { AxiosInstance } from "../utils/axios";

const EventCard = ({ item, upcomming }) => {
  const {
    title,
    creatorName,
    startdate,
    starthour,
    location,
    price,
    _id,
    image,
  } = item;
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const token = localStorage.getItem("userToken");
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (user) {
      const alreadyLiked = item?.likedBy?.includes(user.id);

      // console.log(item, "item");
      // console.log(user);
      if (alreadyLiked) {
        setLiked(true);
      } else setLiked(false);
    }
  }, [item]);

  const handleLike = () => {
    setLikeLoading(true);
    if (liked) {
      AxiosInstance.put(`/api/users/likedEvents/${_id}`)
        .then((res) => {
          setLiked(false);
          setLikeLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      AxiosInstance.post("/api/users/likedEvents/" + _id)
        .then((res) => {
          setLiked(true);
          setLikeLoading(false);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div
        className={`flex flex-col justify-left rounded-xl shadow-md hover:shadow-xl mr-2 transition duration-300 ease-in-out cursor-pointer`}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          position: "relative",
          height: upcomming ? "290px" : "350px",
        }}
      >
        {imageLoading && image && (
          <div className="flex items-center justify-center h-full">
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          </div>
        )}
        <img
          src={image !== "sample" && image ? image : upcomming ? ski : games}
          // src={image}
          style={{
            display: imageLoading ? "none" : "block",
          }}
          onLoad={() => setImageLoading(false)}
          alt="games"
          className="w-full h-[150px] object-cover rounded-t-lg"
        />

        <button
          style={{
            position: "absolute",
            backgroundColor: liked ? "rgba(229, 107, 111, 1)" : "white",
            border: "1px solid rgba(229, 107, 111, 1)",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            padding: "5px",
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: liked ? "white" : "rgba(229, 107, 111, 1)",
            top: "120px",
            right: "2px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
          }}
          onClick={likeLoading ? null : handleLike}
          disabled={likeLoading}
        >
          {likeLoading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          ) : (
            <AiOutlineHeart size={28} />
          )}
        </button>

        <div className="m-2 flex flex-col justify-between h-full">
          <div>
            <NavLink to={`/event/${_id}`}>
              <div
                className="text-[0.9rem] font-semibold]"
                style={{
                  color: "rgba(53, 80, 112, 0.81)",
                }}
              >
                {creatorName}
              </div>
              <div
                className="text-[1.2rem] font-[800] text-[#355070] mt-2"
                style={{
                  letterSpacing: "-0.1rem",
                  lineHeight: "1.3rem",
                }}
              >
                {title}
              </div>
            </NavLink>
          </div>
          <div>
            {startdate && (
              <div className="text-[0.9rem] font-light text-[#355070]">
                {new Date(startdate).toUTCString().slice(0, 16)}, {starthour}
              </div>
            )}
            <div className="font-lighter text-[0.9rem] ml-[-5px] text-[#355070] flex justify-between items-center">
              <div>
                <HiLocationMarker className="inline-block" size={28} />
                {location.length > 25
                  ? location.slice(0, 25) + "..."
                  : location}
              </div>
            </div>

            {!upcomming && (
              <div
                className="ml-2 text-[0.9rem] font-bold uppercase"
                style={{
                  backgroundColor: "#BBC1C8",
                  borderRadius: "5px",
                  color: "#355070",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  cursor: "pointer",
                  float: "right",
                  padding: "2px 10px",
                }}
                // onClick={handleBuy}
              >
                {price === 0 ? "Free" : price + ".00€"}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
