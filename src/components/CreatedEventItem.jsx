import { useEffect, useState } from "react";
import games from "../assets/games.jpg";
import { HiLocationMarker } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, reset } from "../redux/eventSlice";

const EventListItem = ({ item }) => {
  const { title, location, startdate, starthour, _id, image } = item;
  const [imageLoading, setImageLoading] = useState(true);

  const dispatch = useDispatch();
  const { loading, error, isError, deleteRequestSuccess } = useSelector(
    (state) => state.events
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteRequestSuccess) {
      navigate(0);
      dispatch(reset());
    }
  }, [deleteRequestSuccess]);

  const handleDelete = () => {
    dispatch(deleteEvent(_id));
  };

  if (isError) {
    alert(error);
    dispatch(reset());
  }

  return (
    <>
      <div
        className={`flex justify-between flex-col md:flex-row rounded-xl mb-8 shadow-md hover:shadow-xl transition duration-300 ease-in-out cursor-pointer mx-2`}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          position: "relative",
          minHeight: "170px",
        }}
      >
        <div className={`flex flex-col md:flex-row justify-left`}>
          <div
            style={{
              position: "relative",
            }}
            className="lg:w-[350px] md:w-[270px]"
          >
            {imageLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              </div>
            )}
            <img
              src={image !== "sample" ? image : games}
              alt="games"
              style={{
                display: imageLoading ? "none" : "block",
              }}
              onLoad={() => setImageLoading(false)}
              className="w-full h-[170px] object-cover rounded"
            />
          </div>

          <NavLink to={`/event/${_id}`}>
            <div className="ml-2 flex flex-col justify-between h-full">
              <div>
                <div
                  className="text-[1.2rem] md:text-[1.6rem] mt-1 font-[800] text-[#355070]"
                  style={{
                    letterSpacing: "-0.1rem",
                    lineHeight: "1.3rem",
                  }}
                >
                  {title}
                </div>
                <div className="mt-3">
                  {startdate && (
                    <div className="text-[0.9rem] font-normal text-[#355070]">
                      {new Date(startdate).toUTCString().slice(0, 16)},{" "}
                      {starthour}
                    </div>
                  )}
                  <div className="font-lighter text-[0.9rem] ml-[-5px] text-[#355070] flex justify-between items-center">
                    <div>
                      <HiLocationMarker
                        className="inline-block mb-2"
                        size={28}
                      />
                      {location.length > 70
                        ? location.slice(0, 70) + "..."
                        : location}
                    </div>
                  </div>
                </div>

                <div
                  className="
                flex
                flex-col
                justify-start
                items-start
                text-[0.9rem]
                font-bold
                text-[#355070]
                mt-5
        "
                >
                  <div className="mr-5 font-bold text-black mt-1">
                    {" "}
                    {item.attendees?.length} Tickets Booked
                  </div>
                  <div className="mr-5 font-bold text-black">
                    {" "}
                    {item.likedBy?.length} Interested
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
        flex-col
        justify-center
        items-center
        text-[0.9rem]
        font-bold
        text-[#355070]
        m-2
       mt-3
        "
        >
          <NavLink to={`/edit-event/${_id}`}>
            <button className="bg-[#3A8891] text-white px-4 py-2 rounded-full mb-3 w-[130px]">
              Edit Event
            </button>
          </NavLink>
          <NavLink to={`/attendees/${_id}`}>
            <button className="bg-[#3A8891] text-white px-4 py-2 rounded-full mb-3 w-[130px]">
              Attendees List
            </button>
          </NavLink>

          <button
            onClick={handleDelete}
            className="bg-[#bd1111] text-white px-4 py-2 rounded-full mb-3 w-[130px]"
          >
            Cancel Event
          </button>
          {loading && <div className="text-[#355070]">Loading...</div>}
        </div>
      </div>
    </>
  );
};

export default EventListItem;
