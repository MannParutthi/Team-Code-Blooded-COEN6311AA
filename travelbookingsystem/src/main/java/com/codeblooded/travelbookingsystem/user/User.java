package com.codeblooded.travelbookingsystem.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.concurrent.atomic.AtomicInteger;

@AllArgsConstructor // Lombok's annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
public class User {
    public enum UserType { CUSTOMER, AGENT, ADMIN }
    private static final AtomicInteger count = new AtomicInteger(10000);
    private final int id = count.incrementAndGet();
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private String email;
    private String password;
    private UserType userType;
}
