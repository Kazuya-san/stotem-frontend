import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <div
          className="flex flex-col items-center justify-center"
          style={{
            minHeight: "79vh",
          }}
        >
          <h1 className="text-2xl font-bold text-gray-800">
            You are not logged in
          </h1>
          <NavLink to="/login" className="text-blue-600">
            Login
          </NavLink>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
