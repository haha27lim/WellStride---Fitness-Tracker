package com.example.Fitness_Tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Fitness_Tracker.dto.GoalCreateDto;
import com.example.Fitness_Tracker.dto.GoalDto;
import com.example.Fitness_Tracker.dto.GoalUpdateDto;
import com.example.Fitness_Tracker.entity.Goal;
import com.example.Fitness_Tracker.entity.GoalStatus;
import com.example.Fitness_Tracker.entity.User;
import com.example.Fitness_Tracker.exception.ResourceNotFoundException;
import com.example.Fitness_Tracker.exception.UnauthorizedAccessException;
import com.example.Fitness_Tracker.repository.GoalRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public GoalDto createGoal(String username, GoalCreateDto goalCreateDto) {
        User user = userService.findUserByUsername(username);

        Goal goal = new Goal();
        goal.setUser(user);
        goal.setGoalType(goalCreateDto.getGoalType());
        goal.setTargetValue(goalCreateDto.getTargetValue());
        goal.setStartDate(goalCreateDto.getStartDate());
        goal.setEndDate(goalCreateDto.getEndDate());
        goal.setStatus(GoalStatus.ACTIVE);
        goal.setCurrentValue(0.0);

        Goal savedGoal = goalRepository.save(goal);
        return mapGoalToDto(savedGoal);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GoalDto> getGoalsForUser(String username) {
        User user = userService.findUserByUsername(username);
        List<Goal> goals = goalRepository.findByUserIdOrderByStartDateDesc(user.getId());
        return goals.stream()
                    .map(this::mapGoalToDto)
                    .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public GoalDto getGoalById(Long goalId, String username) {
        Goal goal = findGoalByIdAndVerifyOwnership(goalId, username);
        return mapGoalToDto(goal);
    }

    @Override
    @Transactional
    public GoalDto updateGoal(Long goalId, String username, GoalUpdateDto goalUpdateDto) {
        Goal goal = findGoalByIdAndVerifyOwnership(goalId, username);

        if (goalUpdateDto.getTargetValue() != null) {
            goal.setTargetValue(goalUpdateDto.getTargetValue());
        }
        if (goalUpdateDto.getCurrentValue() != null) {
            goal.setCurrentValue(goalUpdateDto.getCurrentValue());
        }
        if (goalUpdateDto.getEndDate() != null) {
            goal.setEndDate(goalUpdateDto.getEndDate());
        }
        if (goalUpdateDto.getStatus() != null) {
            goal.setStatus(goalUpdateDto.getStatus());
        }

        Goal updatedGoal = goalRepository.save(goal);
        return mapGoalToDto(updatedGoal);
    }

    @Override
    @Transactional
    public void deleteGoal(Long goalId, String username) {
        Goal goal = findGoalByIdAndVerifyOwnership(goalId, username);
        goalRepository.delete(goal);
    }

    private Goal findGoalByIdAndVerifyOwnership(Long goalId, String username) {
        User user = userService.findUserByUsername(username);
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found with id: " + goalId));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("User does not have permission to access this goal.");
        }
        return goal;
    }

    private GoalDto mapGoalToDto(Goal goal) {
        return new GoalDto(
                goal.getId(),
                goal.getUser().getId(),
                goal.getGoalType(),
                goal.getTargetValue(),
                goal.getCurrentValue(),
                goal.getStartDate(),
                goal.getEndDate(),
                goal.getStatus()
        );
    }   
}
