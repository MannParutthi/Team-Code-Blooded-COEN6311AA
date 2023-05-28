package com.codeblooded.travelbookingsystem.travelpackages.hotels;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    List<Hotel> hotels = List.of(
            new Hotel("Toronto", "Hilton", Hotel.HotelRatings.THREE_STAR, 120),
            new Hotel("Montreal", "Marriott", Hotel.HotelRatings.FIVE_STAR, 270),
            new Hotel("Toronto", "Sheraton", Hotel.HotelRatings.FOUR_STAR, 315),
            new Hotel("Toronto", "Four Seasons", Hotel.HotelRatings.FIVE_STAR, 120),
            new Hotel("Montreal", "Westin", Hotel.HotelRatings.FOUR_STAR, 150),
            new Hotel("Montreal", "Holiday Inn", Hotel.HotelRatings.THREE_STAR, 415),
            new Hotel("Toronto", "Delta", Hotel.HotelRatings.FOUR_STAR, 350),
            new Hotel("Vancouver", "Fairmont", Hotel.HotelRatings.FIVE_STAR, 450),
            new Hotel("Vancouver", "Hyatt", Hotel.HotelRatings.FOUR_STAR, 250),
            new Hotel("Vancouver", "Ritz Carlton", Hotel.HotelRatings.FIVE_STAR, 270)
    );

    public List<Hotel> getAllHotels() {
        return hotels;
    }

}
