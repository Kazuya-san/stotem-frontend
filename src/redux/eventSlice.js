import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../utils/axios";

const initialState = {
  events: [],
  loading: false,
  page: 1,
  pages: 1,
  error: "",
  isSuccess: false,
  isError: false,
  postRequestSuccess: false,
  deleteRequestSuccess: false,
};

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/api/events?page=" + data);
      // response.data.sort((a, b) => {
      //   return new Date(a.startdate) - new Date(b.startdate);
      // });
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

export const fetchEventsByClub = createAsyncThunk(
  "events/fetchEventsByClub",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/api/events/club/" + data);
      // response.data.sort((a, b) => {
      //   return new Date(a.startdate) - new Date(b.startdate);
      // });
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

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (data, { rejectWithValue }) => {
    try {
      console.log(AxiosInstance.defaults);
      const response = await AxiosInstance.post("/api/events", data);
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

export const editEvent = createAsyncThunk(
  "events/editEvent",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      console.log(AxiosInstance.defaults);
      const response = await AxiosInstance.put(`/api/events/${id}`, data);
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

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id, { rejectWithValue }) => {
    try {
      // console.log(AxiosInstance.defaults);
      const response = await AxiosInstance.delete(`/api/events/${id}`);
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

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
      state.postRequestSuccess = false;
      state.deleteRequestSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.events = action.payload.events;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    });

    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.error = action.payload;
    });

    builder.addCase(createEvent.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.postRequestSuccess = false;
      state.isError = false;
    });

    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.postRequestSuccess = true;
      state.events = [...state.events, action.payload];
    });

    builder.addCase(createEvent.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.postRequestSuccess = false;
      state.error = action.payload;
    });

    builder.addCase(editEvent.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.postRequestSuccess = false;
      state.isError = false;
    });

    builder.addCase(editEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.postRequestSuccess = true;
      state.events = state.events.map((event) => {
        if (event._id === action.payload._id) {
          return action.payload;
        } else {
          return event;
        }
      });
    });

    builder.addCase(editEvent.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.postRequestSuccess = false;
      state.error = action.payload;
    });

    builder.addCase(deleteEvent.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.deleteRequestSuccess = false;
      state.isError = false;
    });

    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteRequestSuccess = true;
      state.events = state.events.filter(
        (event) => event._id !== action.payload._id
      );
    });

    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.deleteRequestSuccess = false;
      state.error = action.payload;
    });

    builder.addCase(fetchEventsByClub.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(fetchEventsByClub.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.events = action.payload.events;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    });

    builder.addCase(fetchEventsByClub.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.error = action.payload;
    });

    builder.addDefaultCase((state) => state);
  },
});

export const { reset } = eventSlice.actions;

export default eventSlice.reducer;
