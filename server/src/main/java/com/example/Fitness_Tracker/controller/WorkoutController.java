package com.example.Fitness_Tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.example.Fitness_Tracker.dto.WorkoutCreateDto;
import com.example.Fitness_Tracker.dto.WorkoutDto;
import com.example.Fitness_Tracker.service.WorkoutService;

import java.util.List;
import jakarta.validation.Valid;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/workouts")
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class WorkoutController {
    
    @Autowired
    private WorkoutService workoutService;

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @PostMapping
    public ResponseEntity<WorkoutDto> createWorkout(@Valid @RequestBody WorkoutCreateDto workoutCreateDto) {
        String username = getCurrentUsername();
        WorkoutDto createdWorkout = workoutService.createWorkout(username, workoutCreateDto);
        return new ResponseEntity<>(createdWorkout, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<WorkoutDto>> getAllWorkoutsForUser() {
        String username = getCurrentUsername();
        List<WorkoutDto> workouts = workoutService.getWorkoutsForUser(username);
        return ResponseEntity.ok(workouts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutDto> getWorkoutById(@PathVariable Long id) {
        String username = getCurrentUsername();

        WorkoutDto workout = workoutService.getWorkoutById(id, username);
        return ResponseEntity.ok(workout);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkout(@PathVariable Long id) {
        String username = getCurrentUsername();

        workoutService.deleteWorkout(id, username);
        return ResponseEntity.noContent().build();
    }
}
