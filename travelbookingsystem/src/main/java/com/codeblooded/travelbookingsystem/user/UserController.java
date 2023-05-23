package com.codeblooded.travelbookingsystem.user;

import com.codeblooded.travelbookingsystem.service.EmailService;
import com.codeblooded.travelbookingsystem.travelpackages.TravelPackage;
import com.codeblooded.travelbookingsystem.travelpackages.TravelPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/customers")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        String response = userService.createUser(user);
        if(response == UserService.USER_ALREADY_EXISTS) {
            return new ResponseEntity<String>(response, HttpStatus.OK);
        }

        return new ResponseEntity<String>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        return new ResponseEntity<Iterable<User>>(userService.getAllUsers(), HttpStatus.OK);
    }
}
