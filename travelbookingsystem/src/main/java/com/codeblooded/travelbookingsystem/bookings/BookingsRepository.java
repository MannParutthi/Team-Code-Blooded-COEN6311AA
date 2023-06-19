package com.codeblooded.travelbookingsystem.bookings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingsRepository extends JpaRepository<Booking, Long> {

    public static final String BOOKING_ALREADY_EXISTS = "Booking Already Exists";
    public static final String BOOKING_CREATED_SUCCESSFULLY = "Booking Created Successfully !";
    public static final String BOOKING_NOT_FOUND = "Booking Not Found";
    public static final String BOOKING_UPDATED_SUCCESSFULLY = "Booking Updated Successfully !";
    public static final String BOOKING_CREATED_PAYMENT_PENDING = "Booking Created, Payment Pending";

}
