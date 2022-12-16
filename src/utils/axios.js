//configure axios and set auth token
import { baseURL } from "./api";

import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL,
});

//setting the auth token by intercepting request
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("userToken"));

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    AxiosInstance.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
