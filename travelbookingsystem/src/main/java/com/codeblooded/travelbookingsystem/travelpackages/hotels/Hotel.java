package com.codeblooded.travelbookingsystem.travelpackages.hotels;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.concurrent.atomic.AtomicInteger;

@AllArgsConstructor // Lombok annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
public class Hotel {
    public enum HotelRatings { THREE_STAR, FOUR_STAR, FIVE_STAR }
    private static final AtomicInteger count = new AtomicInteger(40000);
    private final int id = count.incrementAndGet();
    private String location;
    private String name;
    private HotelRatings rating;
    private int pricePerRoom;
}
