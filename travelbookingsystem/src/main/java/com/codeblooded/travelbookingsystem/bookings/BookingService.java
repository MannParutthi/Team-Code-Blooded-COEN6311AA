package com.codeblooded.travelbookingsystem.bookings;

import com.codeblooded.travelbookingsystem.user.UserService;
import com.codeblooded.travelbookingsystem.user.UserRepository;
import com.codeblooded.travelbookingsystem.travelpackages.TravelPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TravelPackageService travelPackageService;

    private List<Booking> bookings = new ArrayList<>();
    public static final String BOOKING_ALREADY_EXISTS = "Booking Already Exists";
    public static final String BOOKING_CREATED_SUCCESSFULLY = "Booking Created Successfully !";
    public static final String BOOKING_NOT_FOUND = "Booking Not Found";
    public static final String BOOKING_UPDATED_SUCCESSFULLY = "Booking Updated Successfully !";
}
