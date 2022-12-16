import { useState, useEffect } from "react";
import InputField from "../common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { v4 as uuid } from "uuid";
import ProgressBar from "../components/ProgressBar";

// import image from "../assets/wine.jpeg";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "PNG", "JPG"];

const Register = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePicture: "",
    gender: "",
    program: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePicture: "",
    gender: "",
    program: "",
  });

  const [progress, setProgress] = useState(0);
  const [uploadLoad, setUploadLoad] = useState(false);

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
        name: error,
        confirmPassword: error,
        profilePicture: error,
        gender: error,
        program: error,
      });

      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    } else {
      setErrors({
        ...errors,
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePicture: "",
        gender: "",
        program: "",
      });
    }
  }, [isAuthenticated, isError, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(state);

    if (
      state.email.length === 0 ||
      state.password.length < 6 ||
      state.name.length === 0 ||
      state.confirmPassword.length < 6 ||
      state.gender.length === 0 ||
      state.program.length === 0
    ) {
      setErrors({
        ...errors,
        email: state.email.length === 0 ? "Email is required" : "",
        password:
          state.password.length < 6
            ? "Password is required and should be greater than 6 characters"
            : "",
        name: state.name.length === 0 ? "Name is required" : "",
        gender: state.gender.length === 0 ? "Gender is required" : "",
        program: state.program.length === 0 ? "Program is required" : "",
        confirmPassword:
          state.confirmPassword.length < 6
            ? "Confirm Password is required and should be greater than 6 characters"
            : "",
      });
    } else {
      if (state.password !== state.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: "Password and Confirm Password should be same",
        });
      } else {
        if (
          state.confirmPassword !== state.password &&
          state.confirmPassword.length > 0
        ) {
          setErrors({ ...errors, confirmPassword: "Passwords do not match" });
        } else {
          if (state.profilePicture.name) {
            const formData = new FormData();
            formData.append("email", state.email);
            formData.append("password", state.password);
            formData.append("name", state.name);
            // formData.append("profilePicture", state.profilePicture);
            formData.append("gender", state.gender);
            formData.append("program", state.program);
            if (
              !allowedExtensions.includes(
                state.profilePicture.name.split(".").pop()
              )
            ) {
              alert(
                "Please upload file having extensions .jpeg/.jpg/.png/.gif only."
              );
              return false;
            }
            const storageRef = ref(storage, `uploads/users/${uuid()}`);
            const uploadTask = uploadBytesResumable(
              storageRef,
              state.profilePicture
            );

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                setUploadLoad(true);
                const progressP = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(progressP);
              },
              (error) => {
                alert(error);
              },

              async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then(
                  (downloadURL) => {
                    // setImageUrl(downloadURL);
                    formData.append("profilePicture", downloadURL);
                    setUploadLoad(false);
                    dispatch(registerUser(formData));
                  }
                );
              }
            );
          } else {
            dispatch(
              registerUser({
                email: state.email,
                password: state.password,
                name: state.name,
                gender: state.gender,
                program: state.program,
              })
            );
          }
        }
      }
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
      <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-4">Register</h1>

      <form
        className="flex flex-col items-center justify-center w-11/12 md:w-3/6"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Name"
          type="text"
          placeholder="Enter your name"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
          error={errors.name}
          name="name"
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          error={errors.email}
          name="email"
        />
        <div className="flex flex-col items-center justify-between w-full md:flex-row space-x-3">
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            error={errors.password}
            name="password"
          />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={state.confirmPassword}
            onChange={(e) =>
              setState({ ...state, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
            name="confirmPassword"
          />
        </div>

        <div className="flex flex-col items-center justify-between w-full md:flex-row space-x-3">
          <InputField
            label="Gender"
            type="radio"
            placeholder="Enter your Gender"
            value={state.gender}
            onChange={(e) => setState({ ...state, gender: e.target.value })}
            error={errors.gender}
            name="gender"
            options={["male", "female", "other"]}
          />

          <InputField
            label="Program"
            type="select"
            placeholder="Enter your Program"
            value={state.program}
            onChange={(e) => setState({ ...state, program: e.target.value })}
            error={errors.program}
            name="program"
            options={[
              "select",
              "B.Tech",
              "BE",
              "M.Tech",
              "MBA",
              "MCA",
              "BCA",
              "BBA",
              "B.Sc",
              "BS",
              "M.Sc",
              "MS",
              "PhD",
              "Other",
            ]}
          />
        </div>

        <InputField
          label="Profile Picture"
          type="file"
          placeholder="Upload your profile picture"
          onChange={(e) =>
            setState({ ...state, profilePicture: e.target.files[0] })
          }
          error={errors.profilePicture}
          name="profilePicture"
        />

        {progress > 0 && <ProgressBar progressPercentage={progress} />}

        <button
          type="submit"
          className="bg-red-500 w-32 flex justify-center items-center hover:bg-red-600 text-white font-bold py-2 mb-3 px-4 rounded mt-4"
        >
          Submit
          {uploadLoad && (
            <div className="flex items-center justify-center ml-2">
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
