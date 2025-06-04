package com.example.Fitness_Tracker.service;

import java.util.List;

import com.example.Fitness_Tracker.dto.WorkoutCreateDto;
import com.example.Fitness_Tracker.dto.WorkoutDto;

public interface WorkoutService {
    WorkoutDto createWorkout(String username, WorkoutCreateDto workoutCreateDto);
    List<WorkoutDto> getWorkoutsForUser(String username);
    WorkoutDto getWorkoutById(Long workoutId, String username);
    void deleteWorkout(Long workoutId, String username);
}
