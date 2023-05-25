package com.codeblooded.travelbookingsystem.travelpackages;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class TravelPackageService {
    private List<TravelPackage> packages = new ArrayList<>(Arrays.asList(
        new TravelPackage(
                "Toronto",
                "Canada",
                5,
                1050,
                TravelPackage.PackageType.PREMADE,
                50005,
                List.of(60001, 60002, 60003),
                List.of(new HotelDaysWithId(40001, 2), new HotelDaysWithId(40004, 3))),
        new TravelPackage(
                "Vancouver",
                "Canada",
                5,
                2060,
                TravelPackage.PackageType.PREMADE,
                50001,
                List.of(60004, 60005, 60006),
                List.of(new HotelDaysWithId(40009, 2), new HotelDaysWithId(40010, 3))),
        new TravelPackage(
                "Montreal",
                "Canada",
                5,
                2550,
                TravelPackage.PackageType.PREMADE,
                50003,
                List.of(60007, 60008, 60009),
                List.of(new HotelDaysWithId(40002, 2), new HotelDaysWithId(40006, 3)))
));

    public static final String PKG_ALREADY_EXISTS = "Package Already Exists";
    public static final String PKG_CREATED_SUCCESSFULLY = "Package Created Successfully !";
    public static final String TRAVEL_PACKAGE_NOT_FOUND = "Travel Package Not Found !";
    public static final String PKG_UPDATED_SUCCESSFULLY = "Package Updated Successfully !";

    public String createTravelPackage(TravelPackage travelPackage) {
        if(packages.contains(travelPackage)) {
            return PKG_ALREADY_EXISTS;
        }

        packages.add(new TravelPackage(
                travelPackage.getDestinationCity(),
                travelPackage.getDestinationCountry(),
                travelPackage.getNoOfDays(),
                travelPackage.getPackageType()));
        return PKG_CREATED_SUCCESSFULLY;
    }
}
