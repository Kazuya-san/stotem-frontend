import { useState } from "react";

import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { logout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  let token = localStorage.getItem("userToken");

  const { isOrganizer, isAdmin } = token ? jwtDecode(token) : {};

  // console.log(jwtDecode(token));

  return (
    <div
      className="
    w-full
    h-20
    flex
    justify-between
    items-center
    lg:px-[8rem]
    px-6
    sticky top-0 z-50
    shadow-xl
    text-black
  "
      style={{
        backgroundColor: "#E56B6F",
      }}
    >
      <NavLink to="/">
        <div className="text-4xl font-[900] flex justify-between items-center">
          STOTEM
        </div>
      </NavLink>

      <div
        className="flex md:hidden space-x-10 cursor-pointer"
        onClick={() => setNavbar(!navbar)}
      >
        {
          // if navbar is true, show the close icon
          navbar ? (
            <AiOutlineClose size="2rem" />
          ) : (
            <AiOutlineMenu size="2rem" />
          )
        }
      </div>

      {navbar && (
        <div
          className="md:hidden absolute z-50 flex flex-col space-y-5"
          style={{
            top: "5rem",
            right: "0",
            backgroundColor: "white",
            width: "100%",
            padding: "1rem",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          {isAuthenticated ? (
            <>
              {(isOrganizer || isAdmin) && (
                <NavLink
                  to="/create-event"
                  style={({ isActive }) =>
                    isActive
                      ? { textDecoration: "underline" }
                      : { textDecoration: "none" }
                  }
                  onClick={() => setNavbar(false)}
                >
                  <div className="md:text-[1rem] text-[#355070] font-bold cursor-pointer">
                    Create an Event
                  </div>
                </NavLink>
              )}

              {isAdmin && (
                <NavLink
                  to="/all-users"
                  style={({ isActive }) =>
                    isActive
                      ? { textDecoration: "underline" }
                      : { textDecoration: "none" }
                  }
                  onClick={() => setNavbar(false)}
                >
                  <div className="md:text-[1rem] font-bold cursor-pointer">
                    All Users
                  </div>
                </NavLink>
              )}
              {(isOrganizer || isAdmin) && (
                <NavLink
                  to="/my-createdevents"
                  style={({ isActive }) =>
                    isActive
                      ? { textDecoration: "underline" }
                      : { textDecoration: "none" }
                  }
                  onClick={() => setNavbar(false)}
                >
                  <div className="md:text-[1rem] font-bold cursor-pointer">
                    My Created Events
                  </div>
                </NavLink>
              )}
              <NavLink
                to="/my-events"
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                onClick={() => setNavbar(false)}
              >
                <div className="md:text-[1rem] font-bold cursor-pointer">
                  My Events
                </div>
              </NavLink>

              <NavLink
                to="/my-profile"
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                onClick={() => setNavbar(false)}
              >
                <div className="md:text-[1rem] font-bold cursor-pointer">
                  My Profile
                </div>
              </NavLink>
              <div
                className="md:text-[1rem] font-bold cursor-pointer"
                onClick={() => {
                  dispatch(logout());
                  setNavbar(false);
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                onClick={() => setNavbar(false)}
              >
                <div className="md:text-[1rem] font-bold cursor-pointer">
                  Login
                </div>
              </NavLink>
              <NavLink
                to="/register"
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                onClick={() => setNavbar(false)}
              >
                <div className="md:text-[1rem] font-bold cursor-pointer">
                  Register
                </div>
              </NavLink>
            </>
          )}
        </div>
      )}

      <div className="md:flex hidden space-x-10 mr-10">
        {isAuthenticated ? (
          <>
            {(isOrganizer || isAdmin) && (
              <NavLink
                to="/create-event"
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
              >
                <div className="md:text-[1rem] text-[#355070] font-bold cursor-pointer">
                  Create an Event
                </div>
              </NavLink>
            )}
            <NavLink
              to="my-events"
              style={({ isActive }) =>
                isActive
                  ? { textDecoration: "underline" }
                  : { textDecoration: "none" }
              }
            >
              <div className="md:text-[1rem] font-bold cursor-pointer">
                My Events
              </div>
            </NavLink>

            <div>
              <div>
                <div className="peer md:text-[1rem] font-bold cursor-pointer flex justify-center items-center">
                  <BsFillPersonFill size={24} className="mr-2" />
                  My Profile
                </div>
                <div className="hidden peer-hover:flex hover:flex absolute z-50 w-[200px] right-14 flex-col bg-white drop-shadow-lg">
                  <NavLink
                    to="/my-profile"
                    style={({ isActive }) =>
                      isActive
                        ? { textDecoration: "underline" }
                        : { textDecoration: "none" }
                    }
                  >
                    <div className="px-5 py-3 hover:bg-gray-200">
                      My Account
                    </div>
                  </NavLink>
                  {isAdmin && (
                    <NavLink
                      to="/all-users"
                      style={({ isActive }) =>
                        isActive
                          ? { textDecoration: "underline" }
                          : { textDecoration: "none" }
                      }
                    >
                      <div className="px-5 py-3 hover:bg-gray-200">
                        All Users
                      </div>
                    </NavLink>
                  )}
                  {(isOrganizer || isAdmin) && (
                    <NavLink
                      to="/my-createdevents"
                      style={({ isActive }) =>
                        isActive
                          ? { textDecoration: "underline" }
                          : { textDecoration: "none" }
                      }
                    >
                      <div className="px-5 py-3 hover:bg-gray-200">
                        My Created Events
                      </div>
                    </NavLink>
                  )}
                  <div
                    className="px-5 py-3 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <div className="md:text-[1rem] font-bold cursor-pointer">
                Login
              </div>
            </NavLink>
            <NavLink to="/register">
              <div className="md:text-[1rem] font-bold cursor-pointer">
                Register
              </div>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
