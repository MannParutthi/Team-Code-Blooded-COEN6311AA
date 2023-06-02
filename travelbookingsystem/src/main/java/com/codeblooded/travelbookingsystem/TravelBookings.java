package com.codeblooded.travelbookingsystem;

import com.codeblooded.travelbookingsystem.travelpackages.TravelPackage;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor // Lombok annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
public class TravelBookings {
    private TravelPackage travelPackage;
    private int totalNumberOfBookings;
    private int totalRevenueGenerated;
}
