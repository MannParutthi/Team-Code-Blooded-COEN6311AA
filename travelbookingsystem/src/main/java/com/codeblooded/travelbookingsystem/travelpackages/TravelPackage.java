package com.codeblooded.travelbookingsystem.travelpackages;

import com.codeblooded.travelbookingsystem.travelpackages.activities.Activity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor // Lombok annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
@Entity
@Table(name="TRAVEL_PACKAGE")
public class TravelPackage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "destinationCity", nullable = false)
    private String destinationCity;

    @Column(name = "destinationCountry", nullable = false)
    private String destinationCountry;

    @Column(name = "noOfDays", nullable = false)
    private int noOfDays;

    @Column(name = "price", nullable = false)
    private int price;

    public enum PackageType { PREMADE, CUSTOM }
    @Enumerated(EnumType.STRING)
    @Column(name = "packageType", nullable = false)
    private PackageType packageType;

    @Column(name = "flightId", nullable = false)
    private int flightId;

    @ElementCollection
    @CollectionTable(name = "TRAVEL_PACKAGE_ACTIVITIES_MAPPING",
            joinColumns = @JoinColumn(name = "travel_package_id"))
    @Column(name = "activityIdsIncluded")
    private List<Long> activityIdsIncluded;

    @ElementCollection
    @CollectionTable(name = "hotelDaysWithId", joinColumns = @JoinColumn(name = "package_id"))
    private List<HotelDaysWithId> hotelDaysWithId;
}