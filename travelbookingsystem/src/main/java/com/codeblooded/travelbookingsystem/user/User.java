package com.codeblooded.travelbookingsystem.user;

import lombok.Data;
import jakarta.persistence.*;

@Data // Lombok annotation to generate getters and setters
@Entity
@Table(name="USERS")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "dateOfBirth", nullable = false)
    private String dateOfBirth;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    public enum UserType { CUSTOMER, AGENT, ADMIN }
    @Enumerated(EnumType.STRING)
    @Column(name = "userType", nullable = false)
    private UserType userType;
}