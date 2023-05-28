package com.codeblooded.travelbookingsystem.travelpackages;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor // Lombok annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
public class HotelDaysWithId {
    private int hotelId;
    private int noOfDays;
}
