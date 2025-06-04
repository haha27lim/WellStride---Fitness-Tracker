package com.example.Fitness_Tracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalCreateDto {
    
    @NotBlank(message = "Goal type cannot be blank")
    private String goalType;

    @NotNull(message = "Target value cannot be null")
    @Positive(message = "Target value must be positive")
    private Double targetValue;

    @NotNull(message = "Start date cannot be null")
    private LocalDate startDate;

    @FutureOrPresent(message = "End date must be in the present or future")
    private LocalDate endDate;
}
