import { useState, useEffect } from "react";
import InputField from "../common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { loading, isAuthenticated, isError, error, isSuccess } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else if (isError) {
      setErrors({
        ...errors,
        email: error,
        password: error,
      });

      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    } else {
      setErrors({
        ...errors,
        email: "",
        password: "",
      });
    }
  }, [isAuthenticated, isError, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(state);

    if (state.email.length === 0 || state.password.length === 0) {
      setErrors({
        ...errors,
        email: state.email.length === 0 ? "Email is required" : "",
        password: state.password.length === 0 ? "Password is required" : "",
      });
    } else {
      dispatch(loginUser(state));
    }
  };

  if (loading) {
    return (
      <div className="h-[78.8vh] flex justify-center items-cente">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        minHeight: "79vh",
      }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-4">Login</h1>

      <form
        className="flex flex-col items-center justify-center w-11/12 md:w-3/6"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          error={errors.email}
          name="email"
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          error={errors.password}
          name="password"
        />

        <button
          type="submit"
          className="bg-[#E56B6F] w-32 hover:bg-red-600 text-white font-bold py-2 mb-3 px-4 rounded-full mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
