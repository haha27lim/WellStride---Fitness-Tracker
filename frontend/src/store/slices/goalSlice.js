import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const API_URL = "/api/goals/";

const initialState = {
  goals: [],
  status: "idle",
  error: null,
};


const getToken = (getState) => {
  const state = getState();
  return state.auth.user?.token || null;
};


export const fetchGoals = createAsyncThunk(
  "goals/fetchGoals",
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


export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (goalData, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, goalData);
      return response.data;
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);


export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async ({ goalId, goalData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}${goalId}`, goalData);
      return response.data;
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);


export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (goalId, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}${goalId}`);
      return goalId;
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchGoals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.goals = action.payload;
        state.error = null;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(createGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateGoal.fulfilled, (state, action) => {
        const index = state.goals.findIndex(goal => goal.id === action.payload.id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter(goal => goal.id !== action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default goalSlice.reducer;