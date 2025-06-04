package com.example.Fitness_Tracker.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "goals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Goal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    @Column(length = 100)
    private String goalType;

    @NotNull
    private Double targetValue;

    private Double currentValue;

    @NotNull
    private LocalDate startDate;

    @FutureOrPresent(message = "End date must be today or in the future")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private GoalStatus status = GoalStatus.ACTIVE;
}
