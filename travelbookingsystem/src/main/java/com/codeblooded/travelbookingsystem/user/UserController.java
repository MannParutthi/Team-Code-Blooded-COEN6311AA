package com.codeblooded.travelbookingsystem.user;

import com.codeblooded.travelbookingsystem.bookings.BookingsRepository;
import com.codeblooded.travelbookingsystem.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/customers")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Class instance for emailService
    private EmailService emailService;

    @Autowired
    public UserController(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    /**
     * Creates a new user.
     *
     * @param user The user object to be created.
     * @return A response entity with a success message or an error message if the user already exists.
     */
    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(UserService.USER_ALREADY_EXISTS);
        }

        User createdUser = userRepository.save(user);

        // Send welcome email to user
        emailService.sendAccountRegistrationEmail(createdUser.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(UserService.USER_CREATED_SUCCESSFULLY);
    }

    /**
     * Updates an existing user's profile.
     *
     * @param userId The ID of the user to be updated.
     * @param user   The updated user object.
     * @return A response entity with a success message or an error message if the user is not found.
     */
    @PutMapping("/update/{userId}")
    public ResponseEntity<String> updateUserProfile(@PathVariable("userId") Long userId, @RequestBody User user) {
        User existingUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setDateOfBirth(user.getDateOfBirth());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setUserType(user.getUserType());

        userRepository.save(existingUser);
        return ResponseEntity.ok(UserService.USER_UPDATED_SUCCESSFULLY);
    }

    /**
     * Logs in a user.
     *
     * @param userProfile The user's profile containing email and password.
     * @return A response entity with the user object if login is successful, or UNAUTHORIZED status if login fails.
     */
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserProfile userProfile) {
        User user = userRepository.findByEmailAndPassword(userProfile.getEmail(), userProfile.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
     * Retrieves all users.
     *
     * @return A response entity containing all users.
     */
    @GetMapping("/all")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Custom Exception Classes

    /**
     * Custom exception class for user not found.
     */
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException() {
            super(UserService.USER_NOT_FOUND);
        }
    }
}
