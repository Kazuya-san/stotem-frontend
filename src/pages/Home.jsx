import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/eventSlice";

import Hero from "../components/Hero";
import Main from "../components/Main";
import { AxiosInstance } from "../utils/axios";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { events, loading, page, pages } = useSelector((state) => state.events);
  const [myLikedEvents, setMyLikedEvents] = useState([]);
  const [likedLoading, setLikedLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(events, loading, page, pages);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEvents(1));
    fetchLikedEvents();
  }, []);

  const fetchLikedEvents = () => {
    AxiosInstance.get("/api/users/getMyEvents")
      .then((res) => {
        res.data.sort((a, b) => {
          return new Date(a.startdate) - new Date(b.startdate);
        });
        setMyLikedEvents(res.data);
        setLikedLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Hero />

      <Main
        data={events}
        loading={loading}
        likedLoading={likedLoading}
        myLikedEvents={myLikedEvents?.slice(0, 4)}
        // fetchLikedEvents={fetchLikedEvents}
      />

      {/* make a custom pagination here with next and previous */}

      <div className="flex justify-center items-center">
        {currentPage > 1 && (
          <button
            className="bg-[#F9A826] text-white font-bold py-2 px-4 rounded-full w-32"
            onClick={() => {
              setCurrentPage(currentPage - 1);
              dispatch(fetchEvents(currentPage - 1));
            }}
          >
            Previous
          </button>
        )}
        {currentPage < pages && (
          <button
            className="bg-[#F9A826] text-white font-bold py-2 px-4 rounded-full w-32"
            onClick={() => {
              setCurrentPage(currentPage + 1);
              dispatch(fetchEvents(currentPage + 1));
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
