import { useEffect, useState } from "react";
import games from "../assets/games.jpg";
import { HiLocationMarker } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, reset } from "../redux/eventSlice";

const EventListItem = ({ item }) => {
  const { title, location, startdate, starthour, _id, image } = item;
  const [imageLoading, setImageLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, isError, deleteRequestSuccess } = useSelector(
    (state) => state.events
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteRequestSuccess) {
      navigate(0);
      setDeleteLoading(false);
      dispatch(reset());
    }
  }, [deleteRequestSuccess]);

  const handleDelete = () => {
    setDeleteLoading(true);
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
              className="w-full h-[170px] object-cover rounded-l-xl"
            />
          </div>

          <NavLink to={`/event/${_id}`}>
            <div className="ml-2 flex flex-col justify-between h-full">
              <div>
                <div
                  className="text-[1.2rem] md:text-[1.6rem] mt-2 font-[800] uppercase text-[#355070]"
                  style={{
                    letterSpacing: "-0.1rem",
                    lineHeight: "1.3rem",
                  }}
                >
                  {title}
                </div>
                <div className="mt-3">
                  {startdate && (
                    <div className="text-[0.9rem] font-normal text-black">
                      {new Date(startdate).toUTCString().slice(0, 16)},{" "}
                      {starthour}
                    </div>
                  )}
                  <div className="font-lighter text-[0.9rem] mb-8 text-black flex justify-between items-center">
                    <div>
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
                  <div className="mr-5 font-bold text-[#355070]  mt-1">
                    {" "}
                    {item.attendees?.length} Tickets Booked
                  </div>
                  <div className="mr-5 font-bold text-[#355070]">
                    {" "}
                    {item.likedBy?.length} Interested
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
        <div
          className="
                    flex
                    md:flex-col
                    justify-center
                    flex-wrap
                    items-center
                    text-[0.9rem]
                    font-bold
                    text-[#355070]
                    m-2
                    mt-3
                    "
        >
          <NavLink to={`/edit-event/${_id}`}>
            <button className="bg-[#355070] text-white px-4 py-2 rounded-full mr-2 mb-3 w-[130px]">
              Edit Event
            </button>
          </NavLink>
          <NavLink to={`/attendees/${_id}`}>
            <button className="bg-[#355070] text-white px-4 py-2 rounded-full mb-3 w-[130px]">
              Attendees List
            </button>
          </NavLink>

          <button
            onClick={handleDelete}
            className="bg-[#E56B6F] flex items-center justify-center text-white px-4 py-2 rounded-full mb-3 w-[130px]"
          >
            Cancel Event
            {deleteLoading && (
              <div className="flex items-center justify-center ml-2">
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default EventListItem;
