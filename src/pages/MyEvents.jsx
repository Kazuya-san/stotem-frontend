import { useEffect, useState } from "react";
import { AxiosInstance } from "../utils/axios";
import EventCard from "../components/EventCard";
import { NavLink } from "react-router-dom";
import EventListItem from "../components/EventListItem";
import Loader from "../components/Loader";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  // const [bookedEvents, setbookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingLiked, setLoadingLiked] = useState(true);

  useEffect(() => {
    // AxiosInstance.get("/api/users/likedEvents")
    //   .then((res) => {
    //     //sort by date
    //     res.data.sort((a, b) => {
    //       return new Date(a.startdate) - new Date(b.startdate);
    //     });
    //     setEvents(res.data);
    //     setLoadingLiked(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // AxiosInstance.get("/api/users/bookedEvents")
    //   .then((res) => {
    //     res.data.sort((a, b) => {
    //       return new Date(a.startdate) - new Date(b.startdate);
    //     });
    //     setbookedEvents(res.data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    AxiosInstance.get("/api/users/getMyEvents")
      .then((res) => {
        res.data.sort((a, b) => {
          return new Date(a.startdate) - new Date(b.startdate);
        });
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // if (loading || loadingLiked) {
  if (loading) {
    return (
      <div className="h-[78.8vh] flex justify-center items-cente">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="w-full flex justify-center"
      style={{
        background:
          "linear-gradient(180deg, #FCEBE1 0%, #F3E5F2 35%, #FFCAD0 100%)",
        minHeight: "78.8vh",
      }}
    >
      <div className="w-full lg:w-10/12 mt-2 md:mx-8 mx-1">
        {
          // bookedEvents.length > 0 && (
          //   <>
          //     <div className="text-4xl font-bold text-[#3A8891] mb-4">
          //       My Booked Events
          //     </div>
          //     <div className="">
          //       {bookedEvents.map((event) => (
          //         <div key={event._id}>
          //           {/* {JSON.stringify(event)} */}
          //           <EventListItem item={event} />
          //         </div>
          //       ))}
          //     </div>
          //   </>
          // )
        }
        <div className="text-4xl font-bold text-[#3A8891] mb-4">
          My Coming Events
        </div>

        {events.length > 0 ? (
          <div className="">
            {events.map((event, i) => (
              <EventListItem item={event} key={i} />
            ))}
          </div>
        ) : (
          <div className="text-2xl font-bold text-[#3A8891] mb-4">
            No Events Found
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
