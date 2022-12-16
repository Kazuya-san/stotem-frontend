import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import setAuthToken from "../utils/axios";
import { AxiosInstance } from "../utils/axios";

const token = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))
  : null;

const initialState = {
  user: {},
  users: [],
  isAuthenticated: token ? true : false,
  token: token ? token : null,
  loading: false,
  updateSuccess: false,
  error: "",
  isSuccess: false,
  isError: false,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/api/users/login", data);
      localStorage.setItem("userToken", JSON.stringify(response.data.token));
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/api/users", data);
      localStorage.setItem("userToken", JSON.stringify(response.data.token));
      setAuthToken(response.data.token);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put("/api/users/profile", data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put("/api/users/" + id, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/api/users");
      return response.data.users;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/api/users/profile");
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.delete("/api/users");
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
      state.updateSuccess = false;
    },

    logout: (state) => {
      state.user = {};
      state.token = null;
      state.loading = false;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
      state.isAuthenticated = false;
      localStorage.removeItem("userToken");
      setAuthToken(null);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isSuccess = true;
      state.isError = false;
      setAuthToken(action.payload.token);
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isSuccess = true;
      state.isError = false;
      setAuthToken(action.payload.token);
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    });

    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isSuccess = true;
      state.isError = false;
    });

    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    });

    builder.addCase(deleteAccount.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {};
      state.token = null;
      state.isAuthenticated = false;
      state.isSuccess = true;
      state.isError = false;
      localStorage.removeItem("userToken");
      setAuthToken(null);
    });

    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    });

    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.isSuccess = true;
      state.isError = false;
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
      state.updateSuccess = false;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state.updateSuccess = true;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
      state.updateSuccess = false;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
      state.updateSuccess = false;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isSuccess = true;
      state.isError = false;
      state.updateSuccess = true;
    });

    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
      state.updateSuccess = false;
    });

    builder.addDefaultCase((state) => state);
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
