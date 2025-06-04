package com.example.Fitness_Tracker.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "workouts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    @Column(length = 100)
    private String exerciseType;

    @NotNull
    private Integer durationMinutes;

    @NotNull
    private Integer intensity;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime workoutTime = LocalDateTime.now();
}
