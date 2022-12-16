import { useEffect, useState } from "react";
import { AxiosInstance } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import CreatedEventItem from "../components/CreatedEventItem";
import Loader from "../components/Loader";

const MyEvents = () => {
  const [createdevents, setcreatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError]);

  useEffect(() => {
    AxiosInstance.get("/api/events/myevents")
      .then((res) => {
        setcreatedEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setError(err.message);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[78.8vh] flex justify-center items-cente">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg, #FCEBE1 0%, #F3E5F2 35%, #FFCAD0 100%)",
        minHeight: "78.8vh",
      }}
    >
      <div className="w-full lg:w-9/12 mt-2 md:mx-8 mx-1">
        {createdevents.length > 0 ? (
          <>
            <div className="text-4xl font-bold text-[#3A8891] mb-4">
              My Created Events
            </div>
            <div className="">
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                createdevents.map((event) => (
                  <div key={event._id}>
                    {/* {JSON.stringify(event)} */}
                    <CreatedEventItem item={event} />
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="text-4xl text-center font-bold text-[#3A8891] mb-4">
            You have not created any events yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
