package com.example.Fitness_Tracker.security.services;

public interface EmailService {
    void sendPasswordResetEmail(String to, String resetLink);
}
