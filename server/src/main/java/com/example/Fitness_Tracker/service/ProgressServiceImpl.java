package com.example.Fitness_Tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Fitness_Tracker.dto.ProgressDashboardDto;
import com.example.Fitness_Tracker.entity.Goal;
import com.example.Fitness_Tracker.entity.GoalStatus;
import com.example.Fitness_Tracker.entity.User;
import com.example.Fitness_Tracker.entity.Workout;
import com.example.Fitness_Tracker.repository.GoalRepository;
import com.example.Fitness_Tracker.repository.WorkoutRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProgressServiceImpl implements ProgressService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserService userService;

    @Override
    @Transactional(readOnly = true)
    public ProgressDashboardDto getProgressDashboard(String username) {
        User user = userService.findUserByUsername(username);
        Long userId = user.getId();

        List<Workout> workouts = workoutRepository.findByUserIdOrderByWorkoutTimeDesc(userId);
        List<Goal> goals = goalRepository.findByUserIdOrderByStartDateDesc(userId);

        long totalWorkouts = workouts.size();
        long totalDurationMinutes = workouts.stream()
                                            .mapToLong(Workout::getDurationMinutes)
                                            .sum();

        Map<String, Double> workoutDurationByType = workouts.stream()
                .collect(Collectors.groupingBy(Workout::getExerciseType,
                                                Collectors.summingDouble(Workout::getDurationMinutes)));

        Map<String, Long> workoutCountByType = workouts.stream()
                .collect(Collectors.groupingBy(Workout::getExerciseType,
                                                Collectors.counting()));

        int activeGoals = (int) goals.stream()
                                     .filter(goal -> goal.getStatus() == GoalStatus.ACTIVE)
                                     .count();
        int completedGoals = (int) goals.stream()
                                        .filter(goal -> goal.getStatus() == GoalStatus.COMPLETED)
                                        .count();

        ProgressDashboardDto dashboardDto = new ProgressDashboardDto();
        dashboardDto.setTotalWorkouts(totalWorkouts);
        dashboardDto.setTotalDurationMinutes(totalDurationMinutes);
        dashboardDto.setWorkoutDurationByType(workoutDurationByType);
        dashboardDto.setWorkoutCountByType(workoutCountByType);
        dashboardDto.setActiveGoals(activeGoals);
        dashboardDto.setCompletedGoals(completedGoals);

        return dashboardDto;
    }
}


