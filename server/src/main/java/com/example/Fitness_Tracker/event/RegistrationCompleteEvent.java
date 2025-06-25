package com.example.Fitness_Tracker.event;

import lombok.*;
import org.springframework.context.ApplicationEvent;

import com.example.Fitness_Tracker.entity.User;


@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {
    
    private User user;
    private String applicationUrl;


    public RegistrationCompleteEvent(User user, String applicationUrl) {
        super(user);
        this.user = user;
        this.applicationUrl = applicationUrl;
    }
}
