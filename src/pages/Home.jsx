import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/eventSlice";

import Hero from "../components/Hero";
import Main from "../components/Main";
import { AxiosInstance } from "../utils/axios";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { events, loading } = useSelector((state) => state.events);
  const [myLikedEvents, setMyLikedEvents] = useState([]);
  const [likedLoading, setLikedLoading] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEvents());
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
    </>
  );
};

export default Home;
