package com.codeblooded.travelbookingsystem.travelpackages.flights;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/flights")
public class FlightController {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    public FlightController(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @PostMapping("/create")
    public Flight createFlight(@RequestBody Flight flight) {
        return flightRepository.save(flight);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Flight>> getAllFlights() {
        Iterable<Flight> flights = flightRepository.findAll();
        return ResponseEntity.ok(flights);
    }

}
