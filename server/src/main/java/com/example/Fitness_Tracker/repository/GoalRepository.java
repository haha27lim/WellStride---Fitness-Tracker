package com.example.Fitness_Tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Fitness_Tracker.entity.Goal;
import com.example.Fitness_Tracker.entity.GoalStatus;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    
    List<Goal> findByUserIdOrderByStartDateDesc(Long userId);
    List<Goal> findByUserIdAndStatus(Long userId, GoalStatus status);

}
