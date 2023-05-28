package com.codeblooded.travelbookingsystem.travelpackages.activities;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.concurrent.atomic.AtomicInteger;

@AllArgsConstructor // Lombok annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
public class Activity {
    public enum TypeOfActivity { ADVENTURE, RELAXATION, SIGHTSEEING }
    private static final AtomicInteger count = new AtomicInteger(60000);
    private final int id = count.incrementAndGet();
    private String name;
    private int pricePerPerson;
    private TypeOfActivity typeOfActivity;
}
