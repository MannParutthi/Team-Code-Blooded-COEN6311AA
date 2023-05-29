package com.codeblooded.travelbookingsystem.travelpackages.activities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor // Lombok annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
@Entity
@Table(name="ACTIVITIES")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "pricePerPerson", nullable = false)
    private int pricePerPerson;

    public enum TypeOfActivity { ADVENTURE, RELAXATION, SIGHTSEEING }
    @Enumerated(EnumType.STRING)
    @Column(name = "typeOfActivity", nullable = false)
    private TypeOfActivity typeOfActivity;
}
