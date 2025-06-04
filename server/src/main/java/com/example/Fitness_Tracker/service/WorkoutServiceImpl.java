package com.example.Fitness_Tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Fitness_Tracker.dto.WorkoutCreateDto;
import com.example.Fitness_Tracker.dto.WorkoutDto;
import com.example.Fitness_Tracker.entity.User;
import com.example.Fitness_Tracker.entity.Workout;
import com.example.Fitness_Tracker.exception.ResourceNotFoundException;
import com.example.Fitness_Tracker.exception.UnauthorizedAccessException;
import com.example.Fitness_Tracker.repository.WorkoutRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public WorkoutDto createWorkout(String username, WorkoutCreateDto workoutCreateDto) {
        User user = userService.findUserByUsername(username);

        Workout workout = new Workout();
        workout.setUser(user);
        workout.setExerciseType(workoutCreateDto.getExerciseType());
        workout.setDurationMinutes(workoutCreateDto.getDurationMinutes());
        workout.setIntensity(workoutCreateDto.getIntensity());
        workout.setNotes(workoutCreateDto.getNotes());

        workout.setWorkoutTime(workoutCreateDto.getWorkoutTime() != null ? workoutCreateDto.getWorkoutTime() : LocalDateTime.now());

        Workout savedWorkout = workoutRepository.save(workout);
        return mapWorkoutToDto(savedWorkout);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkoutDto> getWorkoutsForUser(String username) {
        User user = userService.findUserByUsername(username);
        List<Workout> workouts = workoutRepository.findByUserIdOrderByWorkoutTimeDesc(user.getId());
        return workouts.stream()
                       .map(this::mapWorkoutToDto)
                       .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public WorkoutDto getWorkoutById(Long workoutId, String username) {
        User user = userService.findUserByUsername(username);
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new ResourceNotFoundException("Workout not found with id: " + workoutId));

        if (!workout.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("User does not have permission to access this workout.");
        }

        return mapWorkoutToDto(workout);
    }

    @Override
    @Transactional
    public void deleteWorkout(Long workoutId, String username) {
        User user = userService.findUserByUsername(username);
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new ResourceNotFoundException("Workout not found with id: " + workoutId));

        if (!workout.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("User does not have permission to delete this workout.");
        }

        workoutRepository.delete(workout);
    }

    private WorkoutDto mapWorkoutToDto(Workout workout) {
        return new WorkoutDto(
                workout.getId(),
                workout.getUser().getId(),
                workout.getExerciseType(),
                workout.getDurationMinutes(),
                workout.getIntensity(),
                workout.getNotes(),
                workout.getWorkoutTime()
        );
    }   
}
