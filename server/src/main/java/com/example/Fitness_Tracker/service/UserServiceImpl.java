package com.example.Fitness_Tracker.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Fitness_Tracker.dto.UserProfileDto;
import com.example.Fitness_Tracker.dto.UserProfileUpdateDto;
import com.example.Fitness_Tracker.entity.ERole;
import com.example.Fitness_Tracker.entity.PasswordResetToken;
import com.example.Fitness_Tracker.entity.Role;
import com.example.Fitness_Tracker.entity.User;
import com.example.Fitness_Tracker.exception.NotFoundException;
import com.example.Fitness_Tracker.repository.PasswordResetTokenRepository;
import com.example.Fitness_Tracker.repository.RoleRepository;
import com.example.Fitness_Tracker.repository.UserRepository;
import com.example.Fitness_Tracker.security.services.EmailServiceImpl;

@Service
public class UserServiceImpl implements UserService {

    @Value("${frontend.url}")
    String frontendUrl;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private EmailServiceImpl emailServiceImpl;

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

            if (userRepo.existsByEmail(updateDto.getEmail()) && !user.getEmail().equals(updateDto.getEmail())) {
                throw new IllegalArgumentException("Error: Email is already in use!");
            }
            user.setEmail(updateDto.getEmail());
        }

        User updatedUser = userRepo.save(user);
        return mapUserToProfileDto(updatedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public User findUserByUsername(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
    }

    private UserProfileDto mapUserToProfileDto(User user) {
        return new UserProfileDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList()));
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Transactional
    public User saveUser(User user) {
        return userRepo.save(user);
    }

    public User getUserById(Long id) {
        return userRepo.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    }

    @Transactional
    public User updateUser(User user) {
        return userRepo.save(user);
    }

    @Transactional
    public void deleteUserById(Long id) {
        User user = userRepo.findById(id).orElse(null);
        if (user == null) {
            throw new NotFoundException("User not found.");
        }
        userRepo.deleteById(id);
    }

    public void updateUserRole(Long userId, String roleName) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        ERole appRole = ERole.valueOf(roleName);
        Role role = roleRepo.findByName(appRole)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRoles(java.util.Collections.singleton(role));
        userRepo.save(user);
    }

    public User findByUsername(String username) {
        Optional<User> user = userRepo.findByUsername(username);
        return user.orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }

    public void updatePassword(Long userId, String password) {
        try {
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            user.setPassword(passwordEncoder.encode(password));
            userRepo.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update password");
        }
    }

    public void generatePasswordResetToken(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        String token = UUID.randomUUID().toString();
        Instant expiryDate = Instant.now().plus(24, ChronoUnit.HOURS);

        PasswordResetToken resetToken = new PasswordResetToken(token, user, expiryDate);
        passwordResetTokenRepository.save(resetToken);

        String resetUrl = frontendUrl + "/reset-password?token=" + token;

        emailServiceImpl.sendPasswordResetEmail(user.getEmail(), resetUrl);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid Password reset Token!"));

        if (resetToken.isUsed())
            throw new RuntimeException("Password reset token has already been used");

        if (resetToken.getExpiryDate().isBefore(Instant.now()))
            throw new RuntimeException("Password reset token has expired");

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);

        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }

    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Transactional
    public User registerUser(User user) {
        if (user.getPassword() != null)
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

}
