import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { AxiosInstance } from "../utils/axios";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AttendeesTable = () => {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  const tableRef = useRef();

  const { id } = useParams();

  let token = localStorage.getItem("userToken");

  const { id: userId, isAdmin } = token ? jwtDecode(token) : {};

  useEffect(() => {
    AxiosInstance.get(`/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const isInterested = (attendee) => {
    const likes = event.likedBy.find((like) => like.userId === attendee.userId);
    if (likes) {
      return true;
    } else {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="h-[78.8vh] flex justify-center items-cente">
        <Loader />
      </div>
    );
  }

  if (event.creator !== userId && !isAdmin) {
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
        <h1 className="text-4xl font-bold text-[#3A8891] mb-4 mt-4">
          Not Authorized as Admin or Creator
        </h1>

        <Link to="/">
          <button className="bg-[#3A8891] text-white px-4 py-2 rounded-md mt-4">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center"
      style={{
        minHeight: "78.7vh",
      }}
    >
      <div className="overflow-x-auto w-5/6">
        <h1 className="text-4xl font-bold text-[#3A8891] mb-4 mt-4">
          {event.title}
        </h1>
        <div className="p-1.5 w-full inline-block align-middle">
          <h1 className="text-2xl font-bold text-center text-[#3A8891] mb-4 mt-4">
            Attendees List
          </h1>
          <DownloadTableExcel
            filename="Attendees table"
            sheet="Attendees"
            currentTableRef={tableRef.current}
          >
            <button className="bg-[#3A8891] text-white px-4 py-2 rounded-md mt-4 mb-2">
              {" "}
              Export excel{" "}
            </button>
          </DownloadTableExcel>
          {!loading && event.attendees?.length > 0 ? (
            <div className="border rounded-lg shadow-lg overflow-x-auto">
              <table
                className="min-w-full divide-y divide-gray-00"
                ref={tableRef}
              >
                <thead className="bg-[#E56B6F] text-black font-bold text-sm">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 font-bold text-left uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-bold text-left uppercase"
                    >
                      Email
                    </th>
                    <th className="px-6 py-3 font-bold text-left uppercase">
                      Interested
                    </th>
                    <th className="px-6 py-3 font-bold text-left uppercase">
                      Booked
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {event.attendees.map((attendee) => (
                    <tr key={attendee._id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {attendee.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {attendee.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {isInterested(attendee) ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        Yes
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-center text-[#3A8891] mb-4 mt-4">
              No Attendees Yet
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendeesTable;
