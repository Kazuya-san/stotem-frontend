import { createPortal } from "react-dom";
import { useEffect, useMemo } from "react";

const ToastPortal = ({ children }) => {
  // Find our portal container in the DOM
  const portalRoot = document.getElementById("notification");

  const toastContainer = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    portalRoot.appendChild(toastContainer);

    return () => {
      toastContainer.remove();
    };
  });

  return createPortal(children, portalRoot);
};

export default ToastPortal;
