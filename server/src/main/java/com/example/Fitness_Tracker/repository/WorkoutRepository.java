package com.example.Fitness_Tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Fitness_Tracker.entity.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    
    List<Workout> findByUserIdOrderByWorkoutTimeDesc(Long userId);

}
