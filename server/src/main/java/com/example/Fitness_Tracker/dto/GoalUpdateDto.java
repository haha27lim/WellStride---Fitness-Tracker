package com.example.Fitness_Tracker.dto;

import java.time.LocalDate;

import com.example.Fitness_Tracker.entity.GoalStatus;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalUpdateDto {
    
    @Positive(message = "Target value must be positive")
    private Double targetValue;

    @Positive(message = "Current value must be positive or zero")
    private Double currentValue;

    @FutureOrPresent(message = "End date must be in the present or future")
    private LocalDate endDate;

    private GoalStatus status;
}
