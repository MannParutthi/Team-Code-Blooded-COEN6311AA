package com.codeblooded.travelbookingsystem.travelpackages.hotels;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/hotels")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    public HotelController(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    /**
     * Creates a new hotel.
     *
     * @param hotel The hotel object to be created.
     * @return The created hotel.
     */
    @PostMapping("/create")
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    /**
     * Retrieves all hotels.
     *
     * @return A response entity containing all hotels.
     */
    @GetMapping("/all")
    public ResponseEntity<Iterable<Hotel>> getAllHotels() {
        Iterable<Hotel> hotels = hotelRepository.findAll();
        return ResponseEntity.ok(hotels);
    }

    /**
     * Deletes a hotel by its ID.
     *
     * @param id The ID of the hotel to be deleted.
     */
    @DeleteMapping("/{id}")
    public void deleteHotel(@PathVariable long id) {
        hotelRepository.deleteById(id);
    }
}
