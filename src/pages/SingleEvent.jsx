import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AxiosInstance } from "../utils/axios";
import image from "../assets/lunch.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import shot from "../assets/shooting-photo.jpg";
import jwtDecode from "jwt-decode";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

const SingleEvent = () => {
  const { id } = useParams();

  //get query params
  // const [searchParams, setSearchParams] = useSearchParams();
  const [imageLoading, setImageLoading] = useState(true);

  const [event, setEvent] = useState({});
  const [liked, setLiked] = useState(false);
  const [bought, setBought] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [error, setError] = useState("");
  const [buyLoad, setBuyLoad] = useState(false);

  const token = localStorage.getItem("userToken");
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    AxiosInstance.get(`/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);

        if (
          user &&
          res.data.attendees.find((attendee) => attendee._id === user.id)
        ) {
          //   console.log(res.data.attendees);

          setBought(true);
        }

        if (user) {
          const alreadyLiked = res.data?.likedBy?.includes(user.id);
          // console.log(item, "item");
          // console.log(user);
          if (alreadyLiked) {
            setLiked(true);
          } else setLiked(false);
        }
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Event not found/deleted or Something went wrong");
      });
  }, [id, bought]);

  // useEffect(() => {
  //   if (searchParams.get("bought")) {
  //     // setBought(true);
  //     alert("You have successfully bought this event");
  //   }
  // }, [searchParams]);

  //   console.log(event);

  const handleLike = () => {
    setLikeLoading(true);
    if (liked) {
      AxiosInstance.put(`/api/users/likedEvents/${id}`)
        .then((res) => {
          setLikeLoading(false);
          setLiked(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      AxiosInstance.post("/api/users/likedEvents/" + id)
        .then((res) => {
          setLikeLoading(false);
          setLiked(true);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBuy = () => {
    setBuyLoad(true);
    AxiosInstance.post("/api/users/boughtEvents/" + id)
      .then((res) => {
        if (res.data.url) {
          setBuyLoad(false);
          window.location.href = res.data.url;
        } else {
          alert("Bought");
          setBuyLoad(false);
          setBought(true);
        }
      })
      .catch((err) => {
        setBuyLoad(false);
        console.log(err);
      });
  };

  if (loading) {
    return (
      <div className="h-[78.8vh] flex justify-center items-cente">
        <Loader />
      </div>
    );
  }

  if (error.length > 0) {
    return (
      <div
        style={{
          height: "78.7vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 className="text-4xl font-bold text-[#3A8891] mb-4 mt-4">{error}</h1>

        <Link to="/">
          <button className="bg-[#3A8891] text-white px-4 py-2 rounded-md mt-4">
            Go Back
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="flex flex-col items-center justify-center">
        <div
          style={{
            position: "relative",
          }}
        >
          {imageLoading && event.image && (
            <div className="flex items-center justify-center h-[350px] min-w-[99vw]">
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            </div>
          )}
          <img
            src={event.image !== "sample" && event.image ? event.image : image}
            alt="event"
            onLoad={() => setImageLoading(false)}
            className="object-cover"
            style={{
              width: "100vw",
              height: "350px",
              display: imageLoading ? "none" : "block",
            }}
          />

          {user && (
            <div
              className="top-[290px] md:w-[110px] md:h-[110px] h-[70px] w-[70px]"
              style={{
                position: "absolute",
                backgroundColor: liked ? "rgba(229, 107, 111, 1)" : "white",
                border: "1px solid rgba(229, 107, 111, 1)",
                borderRadius: "50%",
                padding: "5px",
                zIndex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: liked ? "white" : "rgba(229, 107, 111, 1)",
                right: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
              }}
              onClick={likeLoading ? null : handleLike}
            >
              {likeLoading ? (
                <div className="animate-spin rounded-full md:h-20 md:w-20 w-12 h-12 border-t-2 border-b-2 border-gray-900"></div>
              ) : (
                <div>
                  <div className="hidden md:block">
                    <AiOutlineHeart size={64} />
                  </div>

                  <div className="block md:hidden">
                    <AiOutlineHeart size={36} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start justify-start w-5/6">
          <h1 className="md:text-4xl text-2xl font-[900] text-[#355070] uppercase mt-2 italic">
            {event.title}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-10">
            <div className="col-span-1 mx-1">
              <h1 className="md:text-2xl text-xl font-[900] text-[#E56B6F]">
                Location
              </h1>
              <p className="text-gray-800 mt-5 font-bold underline">
                {event.location}
              </p>
            </div>

            <div className="col-span-1 mx-4">
              <h1 className="md:text-2xl text-xl font-[900] text-[#E56B6F]">
                Dates
              </h1>
              <p className="text-gray-800 font-bold underline mt-5">
                {new Date(event.startdate).toUTCString().slice(0, 16)}
              </p>

              <p className="text-gray-800 mt-2">{event.starthour}</p>

              <p className="text-gray-800 font-bold underline mt-5">
                {new Date(event.enddate).toUTCString().slice(0, 16)}
              </p>

              <p className="text-gray-800 mt-2">{event.endhour}</p>
            </div>

            <div className="col-span-1 mx-4">
              <h1 className="md:text-2xl text-xl font-[900] text-[#E56B6F]">
                Organizer
              </h1>
              <p className="text-gray-800 mt-5 font-bold underline">
                {event.creatorName ? event.creatorName : event.creator}
              </p>
            </div>
            <div className="col-span-1 mx-4">
              <h1 className="md:text-2xl text-xl font-[900] text-[#E56B6F]">
                Attendees
              </h1>
              {/* <p className="text-gray-800 mt-5">{event.attendees.length}</p> */}
              <div className="flex">
                <div className="font-bold text-black text-[1rem] mt-4 mr-4 underline">
                  {" "}
                  {event.attendees?.length}
                </div>
                {event?.attendees?.slice(0, 3).map((attendee, i) => {
                  return (
                    <div
                      key={i}
                      className="ml-[-10px] text-[0.9rem] font-bold hover:underline tooltip"
                    >
                      <span className="tooltiptext">{attendee.name}</span>

                      <img
                        src={
                          attendee.profilePicture &&
                          attendee.profilePicture !== "sample"
                            ? attendee.profilePicture
                            : shot
                        }
                        alt="shot"
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    </div>
                  );
                })}
                {event?.attendees?.length > 3 && (
                  <div
                    className="ml-2 mt-4 text-[0.9rem] font-bold hover:underline"
                    style={{
                      backgroundColor: "rgba(58, 136, 145, 0.4)",
                      borderRadius: "10px",
                      padding: "3px 5px",
                      color: "#355070",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      cursor: "pointer",
                      width: "80px",
                      float: "right",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    {event.attendees.length - 3} more
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {openModal && (
          <Modal setOpenModal={setOpenModal} attendees={event?.attendees} />
        )}

        <div className="flex flex-col md:flex-row items-start w-5/6 mt-10">
          <div className="flex-1">
            <h1 className="md:text-2xl text-xl italic uppercase font-[900] text-[#E56B6F]">
              Description
            </h1>
            <p className="text-gray-800 mt-5">{event.description}</p>
          </div>

          <div className="md:flex-1 w-full md:ml-10">
            <h1 className="md:text-2xl text-xl italic uppercase font-[900] text-[#E56B6F] mb-4">
              Ticket
            </h1>

            <div
              className="text-[0.9rem] font-bold"
              style={{
                backgroundColor: "#BBC1C8",
                borderRadius: "10px",
                padding: "3px 5px",
                color: "black", //"#355070",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
                width: "100%",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="md:ml-4">
                <h1 className="md:text-xl font-[700]">Advance Tickets</h1>

                <p className="text-xs">Tickets left : {event.countInStock}</p>
              </div>

              <div className="mr-4">
                <h1 className="md:text-xl font-[700]">{event.price}.00€</h1>
              </div>
            </div>

            {!bought ? (
              <div
                className="text-[0.9rem] font-bold mt-5 hover:underline"
                style={{
                  backgroundColor: "#BBC1C8",
                  borderRadius: "10px",
                  color: "black", //"#355070",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  cursor: "pointer",
                  width: "fit-content",
                  padding: "3px 15px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  float: "right",
                }}
                onClick={event.countInStock > 0 ? handleBuy : null}
              >
                {event.countInStock > 0 ? "Buy Ticket" : "Sold Out"}
                {buyLoad && (
                  <div className="flex items-center justify-center ml-2">
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="text-[0.9rem] font-bold mt-5 hover:underline"
                style={{
                  backgroundColor: "#BBC1C8",
                  borderRadius: "10px",
                  padding: "3px 5px",
                  color: "black", //"#355070",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  cursor: "pointer",
                  width: "120px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  float: "right",
                }}
              >
                Ticket Bought
              </div>
            )}
          </div>
        </div>

        {/* <EventCard item={event} /> */}
      </div>

      {/* {event.attendees && event.attendees.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="md:text-2xl text-xl font-[900] text-[#E56B6F] italic">Attendees</h1>
          <div className="flex flex-wrap items-center justify-center">
            {event.attendees.map((attendee, i) => (
              <div
                className="flex flex-col items-center justify-center m-2"
                key={i}
              >
                {attendee.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {event.likedBy && event.likedBy.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="md:text-2xl text-xl font-bold text-gray-800">Liked By</h1>
          <div className="flex flex-wrap items-center justify-center">
            {event.likedBy.map((like, i) => (
              <div
                className="flex flex-col items-center justify-center m-2"
                key={i}
              >
                {like.name}
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SingleEvent;
