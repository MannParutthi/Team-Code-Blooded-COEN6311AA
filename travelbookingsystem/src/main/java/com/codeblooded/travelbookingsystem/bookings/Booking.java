package com.codeblooded.travelbookingsystem.bookings;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@NoArgsConstructor
@AllArgsConstructor // Lombok annotation to generate constructor with all the attributes
@Data // Lombok annotation to generate getters and setters
@Entity
@Table(name="BOOKINGS")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "customIdGenerator")
    @GenericGenerator(name = "customIdGenerator", strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "your_sequence_name"),
                    @Parameter(name = "initial_value", value = "30001"),
                    @Parameter(name = "increment_size", value = "1")
            })
    @Column(name = "id")
    private long id;

    @Column(name = "customerId", nullable = false)
    private long customerId;

    @Column(name = "travelPackageId", nullable = false)
    private long travelPackageId;

    @Column(name = "departureDate", nullable = false)
    private String departureDate;

    @Column(name = "paymentId", nullable = false)
    private long paymentId;

    public enum BookingStatus { CONFIRMED, CANCELLED, PENDING }
    @Enumerated(EnumType.STRING)
    @Column(name = "bookingStatus", nullable = false)
    private BookingStatus bookingStatus = BookingStatus.PENDING;
}

