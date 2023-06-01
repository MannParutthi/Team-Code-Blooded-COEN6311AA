package com.codeblooded.travelbookingsystem.bookings;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingResponse {
    private String message;
    private long bookingId;
}
