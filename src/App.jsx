import Router from "./router/Router";
// import { useSelector } from "react-redux";
// import ToastPortal from "./components/Notifcation";

export default function App() {
  // const { error, isError } = useSelector((state) => state.auth);
  return (
    <>
      <Router />
      {/* {isError && (
        <ToastPortal>
          <div
            style={{
              position: "fixed",
              top: 108,
              right: 8,
              backgroundColor: "pink",
              borderRadius: 8,
              padding: 8,
            }}
          >
            <span role="img" aria-label="cheese on toast">
              🧀
            </span>
            {error}
          </div>
        </ToastPortal>
      )} */}
    </>
  );
}
