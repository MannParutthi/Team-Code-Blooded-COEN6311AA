package com.codeblooded.travelbookingsystem.bookingsreport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/travel-bookings")
public class TravelBookingsController {

    @Autowired
    private TravelBookingsService travelBookingsService;

    @GetMapping("/report")
    public List<TravelBookings> generateReportForBookingsAndRevenueByTravelPackage() {
        return travelBookingsService.generateReportForBookingsAndRevenueByTravelPackage();
    }
}
