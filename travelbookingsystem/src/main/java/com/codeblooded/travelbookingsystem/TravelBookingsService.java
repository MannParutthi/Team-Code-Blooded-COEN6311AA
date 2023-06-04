package com.codeblooded.travelbookingsystem;

import com.codeblooded.travelbookingsystem.bookings.BookingService;
import com.codeblooded.travelbookingsystem.bookings.BookingsRepository;
import com.codeblooded.travelbookingsystem.travelpackages.TravelPackageRepository;
import com.codeblooded.travelbookingsystem.bookings.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TravelBookingsService {

    @Autowired
    TravelPackageRepository travelPackageRepository;

    @Autowired
    BookingsRepository bookingsRepository;

    public List<TravelBookings> generateReportForBookingsAndRevenueByTravelPackage() {
        List<TravelBookings> bookingsByPackage = new ArrayList<>();
        travelPackageRepository.findAll().forEach(travelPackage -> {
            int totalBookings = 0;
            int totalRevenue = 0;
            for(Booking booking : bookingsRepository.findAll()) {
                if(booking.getTravelPackageId() == travelPackage.getId()) {
                    totalBookings++;
                }
            }
            totalRevenue = totalBookings * travelPackage.getPrice();
            bookingsByPackage.add(new TravelBookings(travelPackage, totalBookings, totalRevenue));
        });

        return bookingsByPackage;
    }
}
