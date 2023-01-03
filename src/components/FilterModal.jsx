import { useDispatch, useSelector } from "react-redux";
import { fetchEventsByClub, reset } from "../redux/eventSlice";

export default function FilterModal({ setOpenModal, clubs }) {
  const dispatch = useDispatch();
  //   const { loading } = useSelector((state) => state.events);

  const handleFilter = (club) => {
    dispatch(fetchEventsByClub(club));
    setOpenModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center min-h-screen px-4 py-8">
          <div
            className="relative max-w-lg p-4 mx-auto w-5/6 rounded-md shadow-lg"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,206,215,1) 0%, rgba(231,227,216,1) 35%, rgba(193,228,230,1) 100%)",
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
            }}
          >
            <div className="mt-3 sm:flex w-full">
              <div className="mt-2 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-xl font-medium leading-6">Assos</h3>
                <div className="mt-2 w-full">
                  <ul className="border border-gray-200 divide-y w-full divide-gray-200 rounded-md">
                    <li
                      key={"all"}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm cursor-pointer hover:bg-gray-200"
                      onClick={() => handleFilter("all")}
                    >
                      <div className="flex-1 flex items-center">
                        <span className="ml-2 flex-1 ">All</span>
                      </div>
                    </li>
                    {clubs.map((club) => (
                      <li
                        key={club}
                        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm cursor-pointer hover:bg-gray-200"
                        onClick={() => handleFilter(club)}
                      >
                        <div className="flex-1 flex items-center">
                          <span className="ml-2 flex-1 ">{club}</span>
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
