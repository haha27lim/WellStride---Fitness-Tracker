package com.example.Fitness_Tracker.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgressDashboardDto {
    private long totalWorkouts;
    private long totalDurationMinutes;
    private Map<String, Double> workoutDurationByType;
    private Map<String, Long> workoutCountByType;
    private int activeGoals;
    private int completedGoals;

}
