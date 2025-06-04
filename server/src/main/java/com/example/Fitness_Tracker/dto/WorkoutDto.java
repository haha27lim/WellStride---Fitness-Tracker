package com.example.Fitness_Tracker.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDto {
    
    private Long id;
    private Long userId;
    private String exerciseType;
    private Integer durationMinutes;
    private Integer intensity;
    private String notes;
    private LocalDateTime workoutTime;
}
