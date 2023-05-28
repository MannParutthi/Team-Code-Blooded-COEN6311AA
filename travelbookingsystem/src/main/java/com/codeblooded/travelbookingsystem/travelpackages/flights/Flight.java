package com.codeblooded.travelbookingsystem.travelpackages.flights;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.concurrent.atomic.AtomicInteger;

@AllArgsConstructor // Lombok annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
public class Flight {
    private static final AtomicInteger count = new AtomicInteger(50000);
    private final int id = count.incrementAndGet();
    private String source;
    private String destination;
    private int pricePerSeat;
    private String airline;
}
