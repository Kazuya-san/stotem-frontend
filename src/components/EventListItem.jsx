import { useState, useEffect } from "react";
import games from "../assets/games.jpg";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import jwtDecode from "jwt-decode";
import { NavLink } from "react-router-dom";
import { AxiosInstance } from "../utils/axios";
import shot from "../assets/shooting-photo.jpg";
import Modal from "./Modal";

const EventListItem = ({ item, upcomming }) => {
  const {
    title,
    creatorName,
    location,
    startdate,
    starthour,
    price,
    _id,
    image,
  } = item;
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const token = localStorage.getItem("userToken");
  const user = token ? jwtDecode(token) : null;

  const bought = item.attendees.find((userL) => userL._id === user.id);

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

  // console.log(item);

  return (
    <>
      <div
        className={`flex justify-between flex-col md:flex-row rounded-xl mx-2 mb-8 shadow-md hover:shadow-xl transition duration-300 ease-in-out cursor-pointer`}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          position: "relative",
          minHeight: "150px",
        }}
      >
        <div className={`flex flex-col md:flex-row justify-left`}>
          <div
            style={{
              position: "relative",
            }}
            className="lg:w-[350px] md:w-[270px]"
          >
            {imageLoading && image && (
              <div className="flex items-center justify-center h-full mt-5 md:mt-0">
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              </div>
            )}
            <img
              src={image !== "sample" && image ? image : games}
              alt="games"
              style={{
                display: imageLoading ? "none" : "block",
              }}
              onLoad={() => setImageLoading(false)}
              className="w-full h-[150px] object-cover rounded"
            />

            {!upcomming && (
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
            )}
          </div>

          {bought && (
            <div className="absolute top-0 right-0 bg-[#355070] text-white font-bold px-2 py-1 rounded-bl-xl">
              Bought
            </div>
          )}

          <NavLink to={`/event/${_id}`}>
            <div className="ml-2 flex flex-col justify-between h-full">
              <div
                className="text-[1.2rem] md:text-[1.6rem] mt-1 font-[800] text-[#355070]"
                style={{
                  letterSpacing: "-0.1rem",
                  lineHeight: "1.3rem",
                }}
              >
                {title}
              </div>
              <div
                className="text-[1rem] font-bold md:mt-[-20px] lg:mt-[-10px]"
                style={{
                  color: "rgba(53, 80, 112, 0.81)",
                }}
              >
                {creatorName}
              </div>
              <div className="mt-4">
                {startdate && (
                  <div className="text-[0.9rem] font-normal text-[#355070]">
                    {new Date(startdate).toUTCString().slice(0, 16)},{" "}
                    {starthour}
                  </div>
                )}
                <div className="font-lighter text-[0.9rem] ml-[-5px] text-[#355070] flex justify-between items-center">
                  <div>
                    <HiLocationMarker className="inline-block mb-2" size={28} />
                    {location.length > 70
                      ? location.slice(0, 70) + "..."
                      : location}
                  </div>
                </div>

                {/* {!upcomming && (
              <div
                className="ml-2 text-[0.9rem] font-bold hover:underline"
                style={{
                  backgroundColor: "rgba(58, 136, 145, 0.4)",
                  borderRadius: "10px",
                  padding: "3px 5px",
                  color: "#355070",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  cursor: "pointer",
                  width: "fit-content",
                  float: "right",
                }}
                onClick={handleBuy}
              >
                {price}.00€ Buy
              </div>
            )} */}
              </div>
            </div>
          </NavLink>
        </div>

        <div
          className="
        flex
        justify-center
        items-center
        text-[0.9rem]
        font-bold
        text-[#355070]
            m-2
        "
        >
          <div className="mr-5 font-bold text-black text-[1rem] mt-1">
            {" "}
            {item.attendees?.length} attendees
          </div>

          {item?.attendees?.slice(0, 3).map((attendee) => {
            return (
              <div
                className="ml-[-10px] text-[0.9rem] font-bold hover:underline tooltip"
                key={attendee._id}
              >
                <span className="tooltiptext ml-1 mt-2">{attendee.name}</span>
                <img
                  src={
                    attendee.profilePicture &&
                    attendee.profilePicture !== "sample"
                      ? attendee.profilePicture
                      : shot
                  }
                  alt="shot"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            );
          })}
          {item?.attendees?.length > 3 && (
            <div
              className="ml-2 text-[0.9rem] font-bold hover:underline"
              style={{
                backgroundColor: "rgba(58, 136, 145, 0.4)",
                borderRadius: "10px",
                padding: "3px 5px",
                color: "#355070",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
                width: "fit-content",
                float: "right",
              }}
              onClick={() => setOpenModal(true)}
            >
              {item.attendees.length - 3} more
            </div>
          )}

          {openModal && (
            <Modal setOpenModal={setOpenModal} attendees={item.attendees} />
          )}
        </div>
      </div>
    </>
  );
};

export default EventListItem;
