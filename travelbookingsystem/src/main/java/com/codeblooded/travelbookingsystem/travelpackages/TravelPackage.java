package com.codeblooded.travelbookingsystem.travelpackages;

import com.codeblooded.travelbookingsystem.travelpackages.activities.Activity;
import com.codeblooded.travelbookingsystem.travelpackages.flights.Flight;
import com.codeblooded.travelbookingsystem.travelpackages.hotels.Hotel;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.lang3.tuple.Pair;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@AllArgsConstructor // Lombok annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
public class TravelPackage {
    public enum PackageType { PREMADE, CUSTOM }
    private static final AtomicInteger count = new AtomicInteger(20000);
    private final int id = count.incrementAndGet();
    private String destinationCity;
    private String destinationCountry;
    private int noOfDays;
    private PackageType packageType;
    private int flightId;
    private List<HotelDaysWithId> hotelDaysWithId;
}