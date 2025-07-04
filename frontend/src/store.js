import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/slices/authSlice';
import workoutReducer from './store/slices/workoutSlice';
import goalReducer from './store/slices/goalSlice';
import progressReducer from './store/slices/progressSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutReducer,
    goals: goalReducer,
    progress: progressReducer,

  },
});
