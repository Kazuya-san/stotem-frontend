import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Loader from "../components/Loader";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Navbar from "../common/Navbar";
import { Footer } from "../common/Footer";
import SingleEvent from "../pages/SingleEvent";
import CreateEvent from "../pages/CreateEvent";
import MyProfile from "../pages/MyProfile";
import MyEvents from "../pages/MyEvents";
import CreatedEvents from "../pages/CreatedEvents";
import EditEvent from "../pages/EditEvent";
import AttendeesTable from "../pages/AttendeesTable";
import AdminAllUsers from "../pages/AdminAllUsers";
import Notfound from "../pages/Notfound";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

// const HomeComponent = lazy(() => import("../pages/Home"));
// const LoginComponent = lazy(() => import("../pages/Login"));
// const RegisterComponent = lazy(() => import("../pages/Register"));
// const SingleEventComponent = lazy(() => import("../pages/SingleEvent"));
// const CreateEventComponent = lazy(() => import("../pages/CreateEvent"));
// const MyProfileComponent = lazy(() => import("../pages/MyProfile"));
// const MyEventsComponent = lazy(() => import("../pages/MyEvents"));
// const CreatedEventsComponent = lazy(() => import("../pages/CreatedEvents"));
// const EditEventComponent = lazy(() => import("../pages/EditEvent"));
// const AttendeesTableComponent = lazy(() => import("../pages/AttendeesTable"));
// const AdminAllUsersComponent = lazy(() => import("../pages/AdminAllUsers"));
// const NotfoundComponent = lazy(() => import("../pages/Notfound"));

//log out user after 12 hours

const FallBack = () => {
  return (
    <div className="h-[78.8vh] flex justify-center items-cente">
      <Loader />
    </div>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <Navbar />
        {/* <Suspense fallback={<FallBack />}> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/create-event" element={<CreateEvent />} />
          </Route>

          <Route path="/event/:id" element={<SingleEvent />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/attendees/:id" element={<AttendeesTable />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/my-profile" element={<MyProfile />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/all-users" element={<AdminAllUsers />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="my-events" element={<MyEvents />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="my-createdevents" element={<CreatedEvents />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="edit-event/:id" element={<EditEvent />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
        {/* </Suspense> */}
        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
};

export default Router;
