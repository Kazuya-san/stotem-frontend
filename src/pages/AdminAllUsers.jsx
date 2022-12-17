import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUser, reset } from "../redux/authSlice";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import InputField from "../common/InputField";
import ReactPaginate from "react-paginate";

const AdminAllUsers = () => {
  const { users, loading, isError, pages, updateSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  useEffect(() => {
    dispatch(getAllUsers(1));

    if (updateSuccess) {
      dispatch(reset());
    }

    //scroll to top
  }, [updateSuccess]);

  // if (loading) {
  //   return (
  //     <div className="h-[78.8vh] flex justify-center items-cente">
  //       <Loader />
  //     </div>
  //   );
  // }

  if (isError) {
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
          Not Authorized as Admin
        </h1>

        <Link to="/">
          <button className="bg-[#3A8891] text-white px-4 py-2 rounded-md mt-4">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  const handleUpdate = (id, data) => {
    dispatch(updateUser({ id, data }));
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="flex flex-col items-center"
      style={{
        minHeight: "78.7vh",
      }}
    >
      {loading ? (
        <div className="h-[78.8vh] flex justify-center items-cente">
          <Loader />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto w-5/6">
            <h1 className="text-4xl font-bold text-[#3A8891] mb-4 mt-4">
              All Users
            </h1>
            <div className="p-1.5 w-full inline-block align-middle">
              <h1 className="text-2xl font-bold text-center text-[#3A8891] mb-4 mt-4">
                Users List
              </h1>

              <div className="flex items-center justify-center">
                <div className="w-full md:w-1/2">
                  <InputField
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {!loading && users.length > 0 ? (
                <div className="border rounded-lg shadow-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-00">
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
                        {/* <th
                      scope="col"
                      className="px-6 py-3 font-bold text-left uppercase"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-bold text-left uppercase"
                    >
                      Program
                    </th> */}
                        <th className="px-6 py-3 font-bold text-left uppercase">
                          Organizer
                        </th>
                        <th className="px-6 py-3 font-bold text-left uppercase">
                          Admin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {filteredUsers.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.email}
                          </td>
                          {/* <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {user.gender}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {user.program}
                      </td> */}
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.isOrganizer ? (
                              <button
                                onClick={() =>
                                  handleUpdate(user._id, {
                                    isOrganizer: "false",
                                  })
                                }
                                className="bg-[#E56B6F] text-white px-4 py-2 rounded-md mt-4 w-36"
                              >
                                Remove Organizer
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleUpdate(user._id, {
                                    isOrganizer: "true",
                                  })
                                }
                                className="bg-[#3A8891] text-white px-4 py-2 rounded-md mt-4 w-36"
                              >
                                Make Organizer
                              </button>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.isAdmin ? (
                              <button
                                onClick={() =>
                                  handleUpdate(user._id, { isAdmin: "false" })
                                }
                                className="bg-[#E56B6F] text-white px-4 py-2 rounded-md mt-4 w-36"
                              >
                                Remove Admin
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleUpdate(user._id, { isAdmin: "true" })
                                }
                                className="bg-[#3A8891] text-white px-4 py-2 rounded-md mt-4 w-36"
                              >
                                Make Admin
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h1 className="text-2xl font-bold text-center text-[#3A8891] mb-4 mt-4">
                  No Users Yet
                </h1>
              )}
            </div>
          </div>
        </>
      )}

      {users.length > 0 && (
        <div className="flex items-center justify-center mt-4 mb-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => {
              dispatch(getAllUsers(data.selected + 1));
            }}
            //border of red
            //   className="border-[#3A8891] border-2 rounded-full flex justify-center items-center"
            containerClassName="flex justify-center items-center flex-wrap"
            pageClassName="mt-1 rounded-md border-[#3A8891] border text-center text-white h-10 flex items-center justify-center w-10 mr-1"
            pageLinkClassName="text-[#3A8891] w-full h-full flex items-center justify-center"
            activeClassName="bg-[#3A8891]"
            activeLinkClassName="text-[#fff]"
            nextLinkClassName="w-full h-full flex items-center justify-center"
            previousLinkClassName="w-full h-full flex items-center justify-center"
            breakLinkClassName="mr-1 rounded-md mt-1 text-white bg-[#3A8891] text-[#fff] flex items-center justify-center w-10 h-10"
            previousClassName="rounded-md mt-1 text-white bg-[#3A8891] text-[#fff] flex items-center justify-center  w-24 h-10 mr-2"
            nextClassName="ml-1 rounded-md mt-1 text-white bg-[#3A8891] text-[#fff] flex items-center justify-center w-24 h-10 mr-2"
            disabledClassName="rounded-md mt-1 text-white py-2 px-4 w-24 mr-2 opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default AdminAllUsers;
