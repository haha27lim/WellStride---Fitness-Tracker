package com.example.Fitness_Tracker.service;

import com.example.Fitness_Tracker.dto.ProgressDashboardDto;

public interface ProgressService {
    ProgressDashboardDto getProgressDashboard(String username);
}
