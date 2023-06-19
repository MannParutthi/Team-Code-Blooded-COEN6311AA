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

    /**
     * Creates a new flight.
     *
     * @param flight The flight object to be created.
     * @return The created flight.
     */
    @PostMapping("/create")
    public Flight createFlight(@RequestBody Flight flight) {
        return flightRepository.save(flight);
    }

    /**
     * Retrieves all flights.
     *
     * @return A response entity containing all flights.
     */
    @GetMapping("/all")
    public ResponseEntity<Iterable<Flight>> getAllFlights() {
        Iterable<Flight> flights = flightRepository.findAll();
        return ResponseEntity.ok(flights);
    }

}
