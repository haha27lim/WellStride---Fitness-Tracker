package com.example.Fitness_Tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.Fitness_Tracker.dto.GoalCreateDto;
import com.example.Fitness_Tracker.dto.GoalDto;
import com.example.Fitness_Tracker.dto.GoalUpdateDto;
import com.example.Fitness_Tracker.service.GoalService;

import java.util.List;
import jakarta.validation.Valid;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/goals")
@PreAuthorize("hasRole(\'USER\') or hasRole(\'ADMIN\')")
public class GoalController {
    
    @Autowired
    private GoalService goalService;

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @PostMapping
    public ResponseEntity<GoalDto> createGoal(@Valid @RequestBody GoalCreateDto goalCreateDto) {
        String username = getCurrentUsername();
        GoalDto createdGoal = goalService.createGoal(username, goalCreateDto);
        return new ResponseEntity<>(createdGoal, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GoalDto>> getAllGoalsForUser() {
        String username = getCurrentUsername();
        List<GoalDto> goals = goalService.getGoalsForUser(username);
        return ResponseEntity.ok(goals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GoalDto> getGoalById(@PathVariable Long id) {
        String username = getCurrentUsername();

        GoalDto goal = goalService.getGoalById(id, username);
        return ResponseEntity.ok(goal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GoalDto> updateGoal(@PathVariable Long id, @Valid @RequestBody GoalUpdateDto goalUpdateDto) {
        String username = getCurrentUsername();

        GoalDto updatedGoal = goalService.updateGoal(id, username, goalUpdateDto);
        return ResponseEntity.ok(updatedGoal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGoal(@PathVariable Long id) {
        String username = getCurrentUsername();

        goalService.deleteGoal(id, username);
        return ResponseEntity.noContent().build();
    }
}
