import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


const API_URL = "/api/workouts/";

const initialState = {
  workouts: [],
  status: "idle",
  error: null,
};


const getToken = (getState) => {
  const state = getState();
  return state.auth.user?.token || null;
};


export const fetchWorkouts = createAsyncThunk(
  "workouts/fetchWorkouts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);


export const createWorkout = createAsyncThunk(
  "workouts/createWorkout",
  async (workoutData, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, workoutData);
      return response.data;
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);


export const deleteWorkout = createAsyncThunk(
  "workouts/deleteWorkout",
  async (workoutId, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}${workoutId}`);
      return workoutId;
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchWorkouts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workouts = action.payload;
        state.error = null;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
    
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workouts.unshift(action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default workoutSlice.reducer;