package com.codeblooded.travelbookingsystem.user;

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

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(UserService.USER_ALREADY_EXISTS);
        }

        User createdUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(UserService.USER_CREATED_SUCCESSFULLY);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<String>updateUserProfile(@PathVariable("userId") Long userId,
                                                   @RequestBody User user) {

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

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserProfile userProfile) {
        User user = userRepository.findByEmailAndPassword(
                userProfile.getEmail(),
                userProfile.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }


    // Custom Exception Classes
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException() {
            super(UserService.USER_NOT_FOUND);
        }
    }
}
