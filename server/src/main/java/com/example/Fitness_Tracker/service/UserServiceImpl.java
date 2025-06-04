package com.example.Fitness_Tracker.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Fitness_Tracker.dto.UserProfileDto;
import com.example.Fitness_Tracker.dto.UserProfileUpdateDto;
import com.example.Fitness_Tracker.entity.User;
import com.example.Fitness_Tracker.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserProfileDto getUserProfile(String username) {
        User user = findUserByUsername(username);
        return mapUserToProfileDto(user);
    }

    @Override
    @Transactional
    public UserProfileDto updateUserProfile(String username, UserProfileUpdateDto updateDto) {
        User user = findUserByUsername(username);

        if (updateDto.getEmail() != null && !updateDto.getEmail().isBlank()) {

            if (userRepository.existsByEmail(updateDto.getEmail()) && !user.getEmail().equals(updateDto.getEmail())) {
                throw new IllegalArgumentException("Error: Email is already in use!");
            }
            user.setEmail(updateDto.getEmail());
        }

        User updatedUser = userRepository.save(user);
        return mapUserToProfileDto(updatedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
    }

    private UserProfileDto mapUserToProfileDto(User user) {
        return new UserProfileDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList())
        );
    }
}
