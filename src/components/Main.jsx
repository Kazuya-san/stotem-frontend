import { useEffect, useMemo, useState } from "react";
import EventCard from "./EventCard";
import { AiFillCaretDown } from "react-icons/ai";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import FilterModal from "./FilterModal";
import { AxiosInstance } from "../utils/axios";

const Main = ({ data, myLikedEvents, loading, likedLoading }) => {
  const [events, setEvents] = useState(data);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    setEvents(data);
  }, [data]);

  useEffect(() => {
    AxiosInstance.get("/api/events/clubs")
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredEvents = useMemo(
    () =>
      events
        .filter((event) => {
          return event.title.toLowerCase().includes(search.toLowerCase());
        })
        .sort((a, b) => {
          return new Date(a.startdate) - new Date(b.startdate);
        }),
    [events, search]
  );

  //add debounced search
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setSearch(search);
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // if (loading) {
  //   return (
  //     <div className="w-full min-h-[78vh] pb-6">
  //       <div className="flex justify-center items-center h-full">
  //         <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      className="w-full min-h-[600px] pb-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,206,215,1) 0%, rgba(231,227,216,1) 35%, rgba(193,228,230,1) 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "90vw",
          margin: "0 auto",
        }}
      >
        <div className="mb-16 pt-10 text-center">
          <div>
            {/* <span className="font-bold mr-4">Search for an hec event</span> */}
            <input
              type="text"
              placeholder="Look for an event"
              className="md:w-[400px] w-full h-[50px] border-2 border-none outline-none bg-[#D9D9D9] rounded-full text-[#26a6bf] text-xl font-semibold px-4"
              onChange={handleSearch}
              value={search}
            />
          </div>
          <div className="mt-6">
            <span className="text-2xl">
              or browse all suggested events from
              <AiFillCaretDown
                className="inline-block text-[#26a6bf] text-2xl cursor-pointer"
                size={32}
                onClick={() => setShowModal(true)}
              />
              ALL assos:
            </span>
          </div>
        </div>

        {showModal && <FilterModal setOpenModal={setShowModal} clubs={clubs} />}

        <div className="w-full flex md:flex-row flex-col justify-center">
          <div className="md:w-9/12 w-full">
            {loading ? (
              <Loader />
            ) : (
              <div>
                <div className="text-3xl font-[900] text-[#355070] uppercase italic mb-4">
                  Events
                </div>
                <div className="containerM grid overflow-y-auto max-h-[1080px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredEvents.map((item, i) => (
                    <EventCard key={i} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="md:w-3/12 w-full md:ml-10 flex flex-col">
            {loading ? (
              <Loader />
            ) : (
              <div>
                <div className="text-3xl w-full font-[900] text-[#355070] mb-4 uppercase italic">
                  My Comming Events
                </div>
                {myLikedEvents.length > 0 ? (
                  <div className="w-full grid grid-cols-1 gap-4">
                    {myLikedEvents.map((item, i) => (
                      <EventCard key={i} item={item} upcomming={true} />
                    ))}
                    {myLikedEvents.length > 3 && (
                      <div className="flex items-center justify-center">
                        <NavLink to="/my-events">
                          <button className="mt-4 bg-[#26a6bf] text-center text-white cursor-pointer hover:underline font-bold py-2 px-4 rounded-full">
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
        </div>
      </div>
    </div>
  );
};

export default Main;
