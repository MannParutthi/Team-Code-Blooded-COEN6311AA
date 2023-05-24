package com.codeblooded.travelbookingsystem.travelpackages.hotels;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping("/all")
    public ResponseEntity<Iterable<Hotel>> getAllHotels() {
        return new ResponseEntity<Iterable<Hotel>>(hotelService.getAllHotels(), org.springframework.http.HttpStatus.OK);
    }
}
