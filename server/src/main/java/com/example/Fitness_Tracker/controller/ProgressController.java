package com.example.Fitness_Tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Fitness_Tracker.dto.ProgressDashboardDto;
import com.example.Fitness_Tracker.service.ProgressService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/progress")
@PreAuthorize("hasRole(\'USER\') or hasRole(\'ADMIN\')")
public class ProgressController {
    
    @Autowired
    private ProgressService progressService;

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ProgressDashboardDto> getProgressDashboard() {
        String username = getCurrentUsername();
        ProgressDashboardDto dashboardData = progressService.getProgressDashboard(username);
        return ResponseEntity.ok(dashboardData);
    }
}
