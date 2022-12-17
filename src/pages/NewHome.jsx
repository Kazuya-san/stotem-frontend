import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Hero from "../components/Hero";
import NewMain from "../components/NewMain";

const NewHome = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Hero />
      <NewMain />
    </>
  );
};

export default NewHome;
