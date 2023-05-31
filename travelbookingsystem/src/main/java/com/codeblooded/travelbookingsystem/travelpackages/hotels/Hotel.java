package com.codeblooded.travelbookingsystem.travelpackages.hotels;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor // Lombok annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
@Entity
@Table(name="HOTELS")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "name", nullable = false)
    private String name;

    public enum HotelRatings { THREE_STAR, FOUR_STAR, FIVE_STAR }
    @Enumerated(EnumType.STRING)
    @Column(name = "rating", nullable = false)
    private HotelRatings rating;

    @Column(name = "price_per_room", nullable = false)
    private int pricePerRoom;
}
