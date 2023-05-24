package com.codeblooded.travelbookingsystem.travelpackages.flights;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    List<Flight> flights = List.of(
            new Flight("Toronto", "Vancouver", 250, "Air Canada"),
            new Flight("Montreal", "Vancouver", 270, "WestJet"),
            new Flight("Toronto", "Montreal", 315, "Flair Airlines"),
            new Flight("Vancouver", "Montreal", 210, "Porter Airlines"),
            new Flight("Vancouver", "Toronto", 150, "WestJet"),
            new Flight("Montreal", "Toronto", 215, "Air Canada")
    );

    public List<Flight> getAllFlights() {
        return flights;
    }
}
