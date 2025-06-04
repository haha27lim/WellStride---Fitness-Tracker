package com.example.Fitness_Tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Fitness_Tracker.entity.Notification;

import java.util.List;


@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdAndIsReadOrderByCreatedAtDesc(Long userId, boolean isRead);
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);

}
