package com.codeblooded.travelbookingsystem.bookings;

//import com.codeblooded.travelbookingsystem.payment.Payment;
import com.codeblooded.travelbookingsystem.service.EmailService;
import com.codeblooded.travelbookingsystem.travelpackages.TravelPackageRepository;
import com.codeblooded.travelbookingsystem.travelpackages.TravelPackageService;
import com.codeblooded.travelbookingsystem.user.User;
import com.codeblooded.travelbookingsystem.user.UserRepository;
import com.codeblooded.travelbookingsystem.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/bookings")
public class BookingsController {
    @Autowired
    private BookingsRepository bookingsRepository;

    // Class instance for emailService
    private EmailService emailService;

    @Autowired
    public BookingsController(BookingsRepository bookingsRepository, EmailService emailService) {
        this.bookingsRepository = bookingsRepository;
        this.emailService = emailService;
    }

    @Autowired
    private TravelPackageRepository travelPackageRepository;

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/create")
    public ResponseEntity<BookingResponse> createBooking(@RequestBody Booking booking) {

        if(!travelPackageRepository.existsById(booking.getTravelPackageId())) {
            return new ResponseEntity<>(new BookingResponse(TravelPackageService.TRAVEL_PACKAGE_NOT_FOUND, booking.getId()), HttpStatus.CONFLICT);
        }
        if(!userRepository.existsById(booking.getCustomerId())) {
            return new ResponseEntity<>(new BookingResponse(UserService.USER_NOT_FOUND, booking.getId()), HttpStatus.CONFLICT);
        }
        if (bookingsRepository.existsById(booking.getId())) {
            BookingResponse response = new BookingResponse(BookingService.BOOKING_ALREADY_EXISTS, booking.getId());
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        bookingsRepository.save(booking);

        // Email Notification
        User customer = userRepository.findById(booking.getCustomerId());
        if(customer != null) {
            long bookingId = booking.getId();
            emailService.sendBookingConfirmationEmail(customer.getEmail(), customer.getId(), bookingId, booking.getPaymentId(), booking.getTravelPackageId(), booking.getDepartureDate(), booking.getBookingStatus().name());
        }

        return new ResponseEntity<>(new BookingResponse(BookingService.BOOKING_CREATED_SUCCESSFULLY, booking.getId()), HttpStatus.CREATED);
    }

    @PutMapping("/update/{bookingId}")
    public ResponseEntity<String> updateBooking(@PathVariable("bookingId") String bookingId, @RequestBody Booking booking) {

        if (!bookingsRepository.existsById(Long.valueOf(bookingId))) {
            return new ResponseEntity<String>(BookingService.BOOKING_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        booking.setId(Long.parseLong(bookingId));
        bookingsRepository.save(booking);
        booking = bookingsRepository.findById(Long.valueOf(bookingId)).orElse(null);


        // Send email
        User customer = userRepository.findById(booking.getCustomerId());

        if(customer != null) {
            String bookingStatus = booking.getBookingStatus().name();
            emailService.sendBookingUpdateEmail(customer.getEmail(), customer.getId(), booking.getId(), booking.getPaymentId(), booking.getTravelPackageId(), booking.getDepartureDate(), bookingStatus);
        }
        return new ResponseEntity<String>(BookingService.BOOKING_UPDATED_SUCCESSFULLY, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Booking>> getAllBookings() {
        Iterable<Booking> bookings = bookingsRepository.findAll();
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/confirm/{bookingId}")
    public ResponseEntity<String> confirmBooking(@PathVariable("bookingId") String bookingId) {
        Booking booking = bookingsRepository.findById(Long.valueOf(bookingId)).orElse(null);
        if(booking == null) {
            return new ResponseEntity<>(BookingService.BOOKING_NOT_FOUND + " for ID: " + bookingId, HttpStatus.NOT_FOUND);
        }

        if(booking.getBookingStatus() == Booking.BookingStatus.CANCELLED) {
            return new ResponseEntity<>("Booking status was cancelled for ID: " + bookingId + ", therefore booking cannot be confirmed", HttpStatus.NOT_FOUND);
        }

        booking.setBookingStatus(Booking.BookingStatus.CONFIRMED);
        bookingsRepository.save(booking);
        booking = bookingsRepository.findById(Long.valueOf(bookingId)).orElse(null);

        // Send email
        User customer = userRepository.findById(booking.getCustomerId());

        if(customer != null) {
            String bookingStatus = booking.getBookingStatus().name();
            emailService.sendBookingUpdateEmail(customer.getEmail(), customer.getId(), booking.getId(), booking.getPaymentId(), booking.getTravelPackageId(), booking.getDepartureDate(), bookingStatus);
        }


        return new ResponseEntity<>("Booking confirmed for ID: " + bookingId, HttpStatus.OK);
    }

    @PostMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable String bookingId) {
        Booking booking = bookingsRepository.findById(Long.valueOf(bookingId)).orElse(null);
        if (booking == null) {
            return new ResponseEntity<>(BookingService.BOOKING_NOT_FOUND + " for ID: " + bookingId, HttpStatus.NOT_FOUND);
        }

        booking.setBookingStatus(Booking.BookingStatus.CANCELLED);
        bookingsRepository.save(booking);

        // Send email
        User customer = userRepository.findById(booking.getCustomerId());

        if(customer != null) {
            String bookingStatus = booking.getBookingStatus().name();
            emailService.sendBookingUpdateEmail(customer.getEmail(), customer.getId(), booking.getId(), booking.getPaymentId(), booking.getTravelPackageId(), booking.getDepartureDate(), bookingStatus);
        }

        return new ResponseEntity<>("Booking cancelled for ID: " + bookingId, HttpStatus.OK);
    }
}
