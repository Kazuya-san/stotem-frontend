import { useState, useEffect } from "react";
import InputField from "../common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, reset } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { v4 as uuid } from "uuid";
import ProgressBar from "./ProgressBar";

import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "PNG", "JPG"];

const UpdateProfile = ({ user, setShowEdit }) => {
  const [state, setState] = useState({
    email: user.email,
    password: "",
    name: user.name,
    confirmPassword: "",
    profilePicture: "",
    gender: user.gender,
    program: user.program,
    from: user.from || "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePicture: "",
    gender: "",
    program: "",
    from: "",
  });

  const [progress, setProgress] = useState(0);
  const [uploadLoad, setUploadLoad] = useState(false);

  const { loading, isAuthenticated, isError, error, updateSuccess } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      setErrors({
        ...errors,
        email: error,
        password: error,
        name: error,
        confirmPassword: error,
        profilePicture: error,
        gender: error,
        program: error,
        from: error,
      });

      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    } else if (updateSuccess) {
      dispatch(reset());
      navigate("/");
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
        from: "",
      });
    }
  }, [isAuthenticated, isError, error, navigate, updateSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(state);

    if (
      state.email.length === 0 ||
      state.name.length === 0 ||
      state.gender.length === 0 ||
      state.program.length === 0 ||
      state.from.length === 0
    ) {
      setErrors({
        ...errors,
        email: state.email.length === 0 ? "Email is required" : "",
        name: state.name.length === 0 ? "Name is required" : "",
        gender: state.gender.length === 0 ? "Gender is required" : "",
        program: state.program.length === 0 ? "Program is required" : "",
        from: state.from.length === 0 ? "From is required" : "",
      });
    } else {
      if (
        state.password !== state.confirmPassword &&
        state.password.length > 6 &&
        state.confirmPassword.length > 6
      ) {
        setErrors({
          ...errors,
          confirmPassword:
            "Password and Confirm Password should be same and should be atleast 6 characters long",
        });
      } else {
        if (
          state.confirmPassword !== state.password &&
          state.confirmPassword.length > 6
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
            formData.append("from", state.from);

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
                    dispatch(updateProfile(formData));
                    setShowEdit(false);
                  }
                );
              }
            );
          } else {
            dispatch(
              updateProfile({
                email: state.email,
                password: state.password,
                name: state.name,
                gender: state.gender,
                program: state.program,
                from: state.from,
              })
            );

            setShowEdit(false);
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "150vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
      <h1 className="text-4xl font-[900] italic uppercase text-[#355070] mb-4 mt-4">
        Update Profile
      </h1>

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

        <InputField
          label="Where are you from"
          type="select"
          placeholder="Enter your Place"
          value={state.from}
          onChange={(e) => setState({ ...state, from: e.target.value })}
          error={errors.from}
          name="from"
          options={["France", "International"]}
        />

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
              "L3",
              "M1 ex L3",
              "M1 AD",
              "M1 DD",
              "M1 IS",
              "M2 PGE ",
              "M2 Master Spécialisé",
              "MBA",
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

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#355070] w-32 flex justify-center items-center hover:bg-[#5d7ea5] text-white font-bold py-2 mb-3 px-4 rounded mt-4"
          >
            Update
            {uploadLoad && (
              <div className="flex items-center justify-center ml-2">
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              </div>
            )}
          </button>
          <button
            className="bg-[#E56B6F] ml-3 w-32 flex justify-center items-center hover:bg-red-600 text-white font-bold py-2 mb-3 px-4 rounded mt-4"
            onClick={() => setShowEdit(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
