package com.example.Fitness_Tracker.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.example.Fitness_Tracker.entity.ERole;
import com.example.Fitness_Tracker.entity.Role;
import com.example.Fitness_Tracker.repository.RoleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final RoleRepository roleRepository;

    @Bean
    public CommandLineRunner initRoles() {
        return args -> {
            log.info("Initialising roles...");
            
            if (!roleRepository.findByName(ERole.ROLE_USER).isPresent()) {
                Role userRole = new Role();
                userRole.setName(ERole.ROLE_USER);
                roleRepository.save(userRole);
                log.info("Created ROLE_USER");
            }
            
            if (!roleRepository.findByName(ERole.ROLE_ADMIN).isPresent()) {
                Role adminRole = new Role();
                adminRole.setName(ERole.ROLE_ADMIN);
                roleRepository.save(adminRole);
                log.info("Created ROLE_ADMIN");
            }
            
            log.info("Role initialisation completed");
        };
    }
}
