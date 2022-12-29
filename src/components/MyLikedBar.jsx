import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import { AxiosInstance } from "../utils/axios";

const MyLikedBar = ({ myLikedEvents, likedLoading }) => {
  //   const [myLikedEvents, setMyLikedEvents] = useState(events);
  //   const [likedLoading, setLikedLoading] = useState(loading);

  //   console.log(loading);

  //   useEffect(() => {
  //     AxiosInstance.get("/api/users/getMyEvents")
  //       .then((res) => {
  //         res.data.events.sort((a, b) => {
  //           return new Date(a.startdate) - new Date(b.startdate);
  //         });
  //         setMyLikedEvents(res.data.events.slice(0, 4));
  //         setLikedLoading(false);
  //         // console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  return (
    <div className="md:w-3/12 w-full md:ml-10 flex flex-col">
      {likedLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-3xl w-full h-[60px] font-[900] text-[#355070] mb-4 uppercase italic">
            My Coming Events
          </div>
          {myLikedEvents.length > 0 ? (
            <div className="w-full grid grid-cols-1 gap-4">
              {myLikedEvents.map((item, i) => (
                <EventCard key={i} item={item} upcomming={true} />
              ))}
              {myLikedEvents.length > 3 && (
                <div className="flex items-center justify-center">
                  <NavLink to="/my-events">
                    <button className="mt-4 bg-[#E56B6F] text-center text-white cursor-pointer hover:underline font-bold py-2 px-4 rounded-full">
                      See all my events
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <span className="text-2xl">
                You have no events in your calendar
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyLikedBar;
