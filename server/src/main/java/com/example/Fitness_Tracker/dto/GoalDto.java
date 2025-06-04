package com.example.Fitness_Tracker.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import com.example.Fitness_Tracker.entity.GoalStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalDto {
    
    private Long id;
    private Long userId;
    private String goalType;
    private Double targetValue;
    private Double currentValue;
    private LocalDate startDate;
    private LocalDate endDate;
    private GoalStatus status;
}
