import { useEffect, useState } from "react";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import FilterModal from "./FilterModal";
import { AxiosInstance } from "../utils/axios";
import MainContent from "./MainContent";
import MyLikedBar from "./MyLikedBar";

const NewMain = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    AxiosInstance.get("/api/events/clubs")
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
                className="md:w-[400px] pl-10 w-full h-[50px] border-2 border-none outline-none bg-[#D9D9D9] rounded-full text-[#26a6bf] text-xl font-semibold px-4"
                onChange={handleSearch}
                value={search}
              />
            </div>
          </div>
          <div className="mt-6">
            <span className="text-2xl">
              or browse all suggested events from
              <AiFillCaretDown
                className="inline-block text-[#26a6bf] text-2xl cursor-pointer"
                size={32}
                onClick={() => setShowModal(true)}
              />
              ALL assos:
            </span>
          </div>
        </div>

        {showModal && <FilterModal setOpenModal={setShowModal} clubs={clubs} />}

        <div className="w-full flex md:flex-row flex-col justify-center">
          <MainContent search={search} />
          <MyLikedBar />
        </div>
      </div>
    </div>
  );
};

export default NewMain;
