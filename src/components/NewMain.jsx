import { useEffect, useState } from "react";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import FilterModal from "./FilterModal";
import { AxiosInstance } from "../utils/axios";
import MainContent from "./MainContent";
import MyLikedBar from "./MyLikedBar";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../redux/eventSlice";

const NewMain = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [clubs, setClubs] = useState([]);
  const [myLikedEvents, setMyLikedEvents] = useState([]);
  const [likedLoading, setLikedLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    AxiosInstance.get("/api/events/clubs")
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    AxiosInstance.get("/api/users/getMyEvents")
      .then((res) => {
        if (res.data.events.length > 0) {
          res.data.events.sort((a, b) => {
            return new Date(a.startdate) - new Date(b.startdate);
          });
          setMyLikedEvents(res.data.events.slice(0, 4));
        }
        setLikedLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(fetchEvents(1));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
          <div className="flex justify-center items-center">
            <div className="relative flex justify-start items-center">
              <AiOutlineSearch
                size={28}
                className="absolute left-2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Look for an event"
                className="md:w-[400px] pl-10 w-full h-[50px] border-2 border-none outline-none bg-[#D9D9D9] rounded-full text-[#26a6bf] text-xl px-4"
                onChange={handleSearch}
                value={search}
              />
            </div>
          </div>
          <div className="mt-6">
            <span
              className="text-2xl font-light cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              or browse all suggested events from
              <AiFillCaretDown
                className="inline-block text-[#355070] text-2xl cursor-pointer"
                size={32}
              />
              <span className="font-bold text-[#355070] uppercase underline italic">
                ALL
              </span>{" "}
              assos:
            </span>
          </div>
        </div>

        {showModal && <FilterModal setOpenModal={setShowModal} clubs={clubs} />}

        <div className="mb-5 md:hidden block">
          <ul className="flex space-x-2">
            <li>
              <a
                onClick={() => setOpenTab(1)}
                className={` ${
                  openTab === 1
                    ? "bg-[#355070] text-white"
                    : "text-gray-600 bg-white "
                } inline-block px-4 py-2 rounded shadow cursor-pointer`}
              >
                Events
              </a>
            </li>
            <li>
              <a
                onClick={() => setOpenTab(2)}
                className={` ${
                  openTab === 2
                    ? "bg-[#355070] text-white"
                    : "text-gray-600 bg-white "
                } inline-block px-4 py-2 rounded shadow cursor-pointer`}
              >
                My Comming Events
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full flex md:flex-row flex-col justify-center">
          <div className="md:hidden block">
            {openTab === 1 ? (
              <MainContent search={search} />
            ) : (
              <MyLikedBar
                myLikedEvents={myLikedEvents}
                likedLoading={likedLoading}
              />
            )}
          </div>

          <div className="w-full hidden md:flex md:flex-row flex-col justify-center">
            <MainContent search={search} />
            <MyLikedBar
              myLikedEvents={myLikedEvents}
              likedLoading={likedLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMain;
