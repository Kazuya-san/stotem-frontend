import { useEffect, useMemo, useState } from "react";
import EventCard from "./EventCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../redux/eventSlice";
import Loader from "./Loader";
import ReactPaginate from "react-paginate";

const MainContent = ({ search }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents(1));
  }, []);

  const { events, loading, pages } = useSelector((state) => state.events);

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

  return (
    <div className="md:w-9/12 w-full">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-3xl font-[900] text-[#355070] uppercase italic mb-4">
            Events
          </div>
          {filteredEvents.length > 0 ? (
            <div className="containerM grid overflow-y-auto max-h-[1080px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredEvents.map((item, i) => (
                <EventCard key={i} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-2">
              <span className="text-2xl">No events found</span>
            </div>
          )}
        </div>
      )}

      {filteredEvents.length > 0 && (
        <div className="flex justify-center items-center mt-8">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => {
              dispatch(fetchEvents(data.selected + 1));
            }}
            //border of red
            //   className="border-[#355070] border-2 rounded-full flex justify-center items-center"
            containerClassName="flex justify-center items-center flex-wrap"
            pageClassName="mt-1 rounded-md border-[#355070] border text-center text-white h-10 flex items-center justify-center w-10 mr-1"
            pageLinkClassName="text-[#355070] w-full h-full flex items-center justify-center"
            activeClassName="bg-[#355070]"
            activeLinkClassName="text-[#fff]"
            nextLinkClassName="w-full h-full flex items-center justify-center"
            previousLinkClassName="w-full h-full flex items-center justify-center"
            breakLinkClassName="mr-1 rounded-md mt-1 text-white bg-[#355070] text-[#fff] flex items-center justify-center w-10 h-10"
            previousClassName="rounded-md mt-1 text-white bg-[#355070] text-[#fff] flex items-center justify-center  w-24 h-10 mr-2"
            nextClassName="ml-1 rounded-md mt-1 text-white bg-[#355070] text-[#fff] flex items-center justify-center w-24 h-10 mr-2"
            disabledClassName="rounded-md mt-1 text-white py-2 px-4 w-24 mr-2 opacity-50 cursor-not-allowed"
          />
        </div>
      )}

      {/* {currentPage > 1 && (
          <button
            className="bg-[#355070] text-white font-bold py-2 px-4 rounded-full w-32 mr-2"
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
            className="bg-[#355070] text-white font-bold py-2 px-4 rounded-full w-32"
            onClick={() => {
              setCurrentPage(currentPage + 1);
              dispatch(fetchEvents(currentPage + 1));
            }}
          >
            Next
          </button>
        )} */}
    </div>
  );
};

export default MainContent;
