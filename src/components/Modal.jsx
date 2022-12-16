import { useState } from "react";
export default function Modal({ setOpenModal, attendees }) {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center min-h-screen px-4 py-8">
          <div
            className="relative max-w-2xl p-4 mx-auto w-5/6 rounded-md shadow-lg"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,206,215,1) 0%, rgba(231,227,216,1) 35%, rgba(193,228,230,1) 100%)",
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
            }}
          >
            <div className="mt-3 sm:flex w-full">
              <div className="mt-2 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-xl font-medium leading-6">Attendees</h3>
                <div className="mt-2 w-full">
                  <ul className="border border-gray-200 divide-y w-full divide-gray-200 rounded-md">
                    {attendees.map((attendee) => (
                      <li
                        key={attendee._id}
                        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      >
                        <div className="flex-1 flex items-center">
                          {/* <img
                            className="h-6 w-6 rounded-full"
                            src={attendee.profilePic}
                            alt=""
                          /> */}
                          <span className="ml-2 mr-8">
                            {imageLoading && (
                              <div className="flex items-center justify-center h-full">
                                <div className="flex justify-center items-center h-full">
                                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                                </div>
                              </div>
                            )}

                            {attendee.profilePicture !== "sample" &&
                              attendee.profilePicture && (
                                <img
                                  src={attendee.profilePicture}
                                  alt={attendee.name}
                                  style={{
                                    display: imageLoading ? "none" : "block",
                                  }}
                                  onLoad={() => setImageLoading(false)}
                                  className="h-16 w-16 rounded-full object-cover"
                                />
                              )}
                          </span>

                          <span className="ml-2 flex-1">{attendee.name}</span>

                          <span className="ml-2 flex-1 ">{attendee.email}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
