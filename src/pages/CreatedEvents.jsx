import { useEffect, useState } from "react";
import { AxiosInstance } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import CreatedEventItem from "../components/CreatedEventItem";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";

const MyEvents = () => {
  const [createdevents, setcreatedEvents] = useState([]);
  const [pages, setPages] = useState(1);
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
    fetchMyCreatedEvents();
  }, []);

  const fetchMyCreatedEvents = (page = 1) => {
    AxiosInstance.get("/api/events/myevents?page=" + page)
      .then((res) => {
        setcreatedEvents(res.data.events);
        setPages(res.data.pages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setError(err.message);
      });
  };

  // if (loading) {
  //   return (
  //     <div className="h-[78.8vh] flex justify-center items-cente">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #FCEBE1 0%, #F3E5F2 35%, #FFCAD0 100%)",
        minHeight: "78.8vh",
      }}
    >
      <div className="w-full flex items-start justify-center">
        {loading ? (
          <div className="h-[78.8vh] flex justify-center items-cente">
            <Loader />
          </div>
        ) : (
          <div className="w-full lg:w-10/12 mt-2 md:mx-8 mx-1">
            {createdevents.length > 0 ? (
              <>
                <div className="text-4xl ml-2 font-bold text-[#355070] mb-16 mt-12">
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
              <div className="text-4xl text-center font-bold text-[#355070] mb-4">
                You have not created any events yet.
              </div>
            )}
          </div>
        )}
      </div>
      {createdevents.length > 0 && (
        <div className="flex items-center justify-center mt-4 pb-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => {
              fetchMyCreatedEvents(data.selected + 1);
            }}
            //border of red
            //   className="border-[#355070] border-2 rounded-full flex justify-center items-center"
            containerClassName="flex justify-center items-center flex-wrap"
            pageClassName="mt-1 rounded-md border-[#355070] border text-center text-white h-10 flex items-center justify-center w-10 mr-1"
            pageLinkClassName="text-[#355070] w-full h-full flex items-center justify-center"
            activeClassName="bg-[#355070] text-[#fff]"
            activeLinkClassName="text-[#fff] link"
            nextLinkClassName="w-full h-full flex items-center justify-center"
            previousLinkClassName="w-full h-full flex items-center justify-center"
            breakLinkClassName="mr-1 rounded-md mt-1 text-white bg-[#355070] text-[#fff] flex items-center justify-center w-10 h-10"
            previousClassName="rounded-md mt-1 text-white bg-[#355070] text-[#fff] flex items-center justify-center  w-24 h-10 mr-2"
            nextClassName="ml-1 rounded-md mt-1 text-white bg-[#355070] text-[#fff] flex items-center justify-center w-24 h-10 mr-2"
            disabledClassName="rounded-md mt-1 text-white py-2 px-4 w-24 mr-2 opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default MyEvents;
