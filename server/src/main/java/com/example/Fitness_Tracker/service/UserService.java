package com.example.Fitness_Tracker.service;

import com.example.Fitness_Tracker.dto.UserProfileDto;
import com.example.Fitness_Tracker.dto.UserProfileUpdateDto;
import com.example.Fitness_Tracker.entity.User;

public interface UserService {
    UserProfileDto getUserProfile(String username);
    UserProfileDto updateUserProfile(String username, UserProfileUpdateDto updateDto);
    User findUserByUsername(String username);
}
