import { useEffect, useState } from "react";
import { AxiosInstance } from "../utils/axios";
import EventListItem from "../components/EventListItem";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = (page = 1) => {
    AxiosInstance.get("/api/users/getMyEvents?page=" + page)
      .then((res) => {
        res.data.events.sort((a, b) => {
          return new Date(a.startdate) - new Date(b.startdate);
        });
        setEvents(res.data.events);
        setPages(res.data.pages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (loading || loadingLiked) {
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
      <div className="w-full flex justify-center">
        {loading ? (
          <div className="h-[78.8vh] flex justify-center items-cente">
            <Loader />
          </div>
        ) : (
          <div className="w-full lg:w-10/12 mt-2 md:mx-8 mx-4">
            {
              // bookedEvents.length > 0 && (
              //   <>
              //     <div className="text-4xl font-bold text-[#355070] mb-4">
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
            <div className="text-4xl font-bold text-[#355070] mb-16 mt-14 italic uppercase">
              My Coming Events
            </div>

            {events.length > 0 ? (
              <div className="">
                {events.map((event, i) => (
                  <EventListItem item={event} key={i} />
                ))}
              </div>
            ) : (
              <div className="text-2xl font-bold text-[#355070] mb-4">
                No Events Found
              </div>
            )}
          </div>
        )}
      </div>

      {events.length > 0 && (
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
              fetchMyEvents(data.selected + 1);
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
