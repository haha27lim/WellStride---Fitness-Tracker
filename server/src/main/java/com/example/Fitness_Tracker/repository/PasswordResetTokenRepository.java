package com.example.Fitness_Tracker.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Fitness_Tracker.entity.PasswordResetToken;
import com.example.Fitness_Tracker.entity.User;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUser(User user);
    
    void deleteByUser(User user);
} 
