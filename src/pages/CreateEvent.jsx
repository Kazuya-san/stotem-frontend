import { useState, useEffect } from "react";
import InputField from "../common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, reset } from "../redux/eventSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { v4 as uuid } from "uuid";
import ProgressBar from "../components/ProgressBar";
import { AiOutlinePlusCircle } from "react-icons/ai";

// import image from "../assets/wine.jpeg";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "PNG", "JPG"];

const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    // subtitle: "",
    startdate: "",
    enddate: "",
    starthour: "",
    endhour: "",
    location: "",
    price: "0",
    // category: "",
    description: "",
    // club: "",
    countInStock: "",
    file: "",
  });

  const [image, setImage] = useState("");

  const [progress, setProgress] = useState(0);
  const [uploadLoad, setUploadLoad] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    // subtitle: "",
    startdate: "",
    enddate: "",
    starthour: "",
    endhour: "",
    location: "",
    price: "",
    file: "",
    // category: "",
    description: "",
    // club: "",
    countInStock: "",
  });

  const { loading, isError, error, postRequestSuccess } = useSelector(
    (state) => state.events
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (postRequestSuccess) {
      console.log("success");
      dispatch(reset());
      navigate("/");
    } else if (isError) {
      setErrors({
        ...errors,
        title: error,
        // subtitle: error,
        startdate: error,
        enddate: error,
        starthour: error,
        endhour: error,
        location: error,
        price: error,
        file: error,
        // category: error,
        description: error,
        // club: error,
        countInStock: error,
      });

      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    } else {
      setErrors({
        ...errors,
        title: "",
        // subtitle: "",
        startdate: "",
        enddate: "",
        starthour: "",
        endhour: "",
        location: "",
        price: "",
        file: "",
        // category: "",
        description: "",
        // club: "",
        countInStock: "",
      });
    }
  }, [postRequestSuccess, isError, error, navigate]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        setImage(fileReader.result);
      };

      setEvent({ ...event, [name]: e.target.files[0] });
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      event.title.length === 0 ||
      //   event.subtitle.length === 0 ||
      event.startdate.length === 0 ||
      event.enddate.length === 0 ||
      event.starthour.length === 0 ||
      event.endhour.length === 0 ||
      event.location.length === 0 ||
      event.price.length === 0 ||
      //   event.category.length === 0 ||
      event.description.length === 0 ||
      // event.club.length === 0 ||
      event.countInStock.length === 0
    ) {
      setErrors({
        ...errors,
        title: event.title.length === 0 ? "Title is required" : "",
        // subtitle: event.subtitle.length === 0 ? "Subtitle is required" : "",
        startdate: event.startdate.length === 0 ? "Start date is required" : "",
        enddate: event.enddate.length === 0 ? "End date is required" : "",
        starthour: event.starthour.length === 0 ? "Start hour is required" : "",
        endhour: event.endhour.length === 0 ? "End hour is required" : "",
        location: event.location.length === 0 ? "Location is required" : "",
        price: event.price.length === 0 ? "Price is required" : "",
        // category: event.category.length === 0 ? "Category is required" : "",
        description:
          event.description.length === 0 ? "Description is required" : "",
        // club: event.club.length === 0 ? "Club is required" : "",
        countInStock:
          event.countInStock.length === 0 ? "Count in stock is required" : "",
      });
    } else {
      // if()

      if (event.file.name) {
        const formData = new FormData();
        formData.append("title", event.title);
        // formData.append("subtitle", event.subtitle);
        formData.append("startdate", event.startdate);
        formData.append("enddate", event.enddate);
        formData.append("starthour", event.starthour);
        formData.append("endhour", event.endhour);
        formData.append("location", event.location);
        formData.append("price", event.price);
        // formData.append("category", event.category);
        formData.append("description", event.description);
        // formData.append("club", event.club);
        formData.append("countInStock", event.countInStock);

        //formData.append("eventPic", event.file);

        if (!allowedExtensions.includes(event.file.name.split(".").pop())) {
          alert(
            "Please upload file having extensions .jpeg/.jpg/.png/.gif only."
          );
          return false;
        }
        const storageRef = ref(storage, `uploads/events/${uuid()}`);
        const uploadTask = uploadBytesResumable(storageRef, event.file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setUploadLoad(true);
            const progressP = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            setProgress(progressP);

            console.log(progressP);
          },
          (error) => {
            alert(error);
          },

          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                console.log(downloadURL);
                // setImageUrl(downloadURL);
                formData.append("image", downloadURL);
                setUploadLoad(false);
                dispatch(createEvent(formData));
              }
            );
          }
        );
      } else dispatch(createEvent(event));

      // console.log(event);
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
    <div className="flex flex-col items-center justify-center mb-3">
      <form
        className="flex items-center md:items-start justify-center w-full mx-10 md:flex-row flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center w-5/6 md:w-2/6 mr-2">
          <h1 className="text-4xl flex items-center justify-start w-full font-bold text-[#355070] italic mb-8 mt-8">
            Create Event
          </h1>
          <div className="flex items-start justify-start w-full my-4 mb-8">
            <h1 className="text-xl font-bold text-[#355070]">Basic Infos</h1>
          </div>
          <InputField
            label="Title"
            type="text"
            placeholder="Enter event name"
            name="title"
            value={event.title}
            onChange={handleChange}
            error={errors.title}
          />

          {/* <InputField
          label="Subtitle"
          type="text"
          placeholder="Enter event name"
          name="subtitle"
          value={event.subtitle}
          onChange={handleChange}
          error={errors.subtitle}
        /> */}

          <InputField
            label="Description"
            type="text"
            placeholder="Enter event description"
            name="description"
            value={event.description}
            onChange={handleChange}
            error={errors.description}
          />

          <div className="flex items-start justify-start w-full my-8">
            <h1 className="text-xl font-bold text-[#355070]">Time</h1>
          </div>
          <div className="flex flex-col items-center justify-between w-full md:flex-row space-x-3">
            <InputField
              label="Starting Date"
              type="date"
              placeholder="Enter event start date"
              name="startdate"
              value={event.startdate}
              onChange={handleChange}
              error={errors.startdate}
            />

            <InputField
              label="Starting Hour"
              type="time"
              placeholder="Enter event start hour"
              name="starthour"
              value={event.starthour}
              onChange={handleChange}
              error={errors.starthour}
            />
          </div>

          <div className="flex flex-col items-center justify-between w-full md:flex-row space-x-3">
            <InputField
              label="Ending Date"
              type="date"
              placeholder="Enter event end date"
              name="enddate"
              value={event.enddate}
              onChange={handleChange}
              error={errors.enddate}
            />

            <InputField
              label="Ending Hour"
              type="time"
              placeholder="Enter event end hour"
              name="endhour"
              value={event.endhour}
              onChange={handleChange}
              error={errors.endhour}
            />
          </div>

          {/* <InputField
        label="Event Time"
        type="time"
        placeholder="Enter event time"
        name="eventTime"
      /> */}

          <div className="flex items-start justify-start w-full my-8">
            <h1 className="text-xl font-bold text-[#355070]">Location</h1>
          </div>

          <InputField
            label="Address"
            type="text"
            placeholder="Enter event location"
            name="location"
            value={event.location}
            onChange={handleChange}
            error={errors.location}
          />

          {/* <InputField
        label="Event Image"
        type="file"
        placeholder="Enter event image"
        name="eventImage"
      /> */}

          <div className="flex items-center justify-start w-full text-[#355070] my-8">
            <AiOutlinePlusCircle size={32} className="mr-1" />
            <h1 className="text-xl font-bold text-[#355070]">Add a Ticket</h1>
          </div>

          <InputField
            label="Price"
            type="number"
            placeholder="Enter event price"
            name="price"
            value={event.price}
            onChange={handleChange}
            error={errors.price}
          />

          {/* <InputField
          label="Category"
          type="text"
          placeholder="Enter event category"
          name="category"
          value={event.category}
          onChange={handleChange}
          error={errors.category}
        /> */}

          {/* <InputField
            label="Club"
            type="text"
            placeholder="Enter event club"
            name="club"
            value={event.club}
            onChange={handleChange}
            error={errors.club}
          /> */}

          <InputField
            label="Capacity"
            type="number"
            placeholder="Enter event capacity"
            name="countInStock"
            value={event.countInStock}
            onChange={handleChange}
            error={errors.countInStock}
          />

          <div className="hidden md:block">
            <button
              type="submit"
              className="bg-[#355070] flex justify-center items-center hover:bg-[#647e9e] my-6 text-white font-bold py-2 px-4 rounded-full"
            >
              Create Event
              {uploadLoad && (
                <div className="flex items-center justify-center ml-2">
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                </div>
              )}
            </button>

            {/* {uploadLoad && (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            )} */}
          </div>
        </div>

        <div className="w-5/6 md:w-2/6 mt-6 md:mt-28 flex flex-col items-center justify-center md:ml-10">
          {image.length > 0 && (
            <img
              src={image}
              alt="eventImage"
              className="w-[300px] h-[300px] rounded-full object-cover"
            />
          )}

          <InputField
            label="Event Image"
            type="file"
            placeholder="Enter event image"
            name="file"
            // value={event.eventImage}
            onChange={handleChange}
            // error={errors.eventImage}
          />

          {progress > 0 && <ProgressBar progressPercentage={progress} />}
          <div className="block md:hidden mt-2">
            <button
              type="submit"
              className="bg-blue-500 flex justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Event
              {uploadLoad && (
                <div className="flex items-center justify-center ml-2">
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
