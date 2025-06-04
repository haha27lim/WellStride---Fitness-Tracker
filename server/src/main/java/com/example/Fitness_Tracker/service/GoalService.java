package com.example.Fitness_Tracker.service;

import java.util.List;

import com.example.Fitness_Tracker.dto.GoalCreateDto;
import com.example.Fitness_Tracker.dto.GoalDto;
import com.example.Fitness_Tracker.dto.GoalUpdateDto;

public interface GoalService {
    GoalDto createGoal(String username, GoalCreateDto goalCreateDto);
    List<GoalDto> getGoalsForUser(String username);
    GoalDto getGoalById(Long goalId, String username);
    GoalDto updateGoal(Long goalId, String username, GoalUpdateDto goalUpdateDto);
    void deleteGoal(Long goalId, String username);
}
