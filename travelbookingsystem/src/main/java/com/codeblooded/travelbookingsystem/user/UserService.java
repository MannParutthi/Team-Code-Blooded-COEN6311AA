package com.codeblooded.travelbookingsystem.user;

import com.codeblooded.travelbookingsystem.travelpackages.TravelPackage;
import com.codeblooded.travelbookingsystem.travelpackages.TravelPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {
    private List<User> users = new ArrayList<>(Arrays.asList(
            new User("Concordia",
                    "Panel",
                    "2001-02-21T00:00:00.000Z",
                    "concordia.admin@concordia.ca",
                    "admin",
                    User.UserType.ADMIN
            )
    ));
    public static final String USER_ALREADY_EXISTS = " User Already Exists";
    public static final String USER_CREATED_SUCCESSFULLY = "User Created Successfully !";

    public static final String USER_UPDATED_SUCCESSFULLY = "User Updated Successfully !";
    public static final String USER_NOT_FOUND = "User Not Found !";


    public String createUser(User user) {
        boolean customerExists = getAllUsers().stream().anyMatch(customer -> customer.getEmail().equals(user.getEmail()));
        if(customerExists) {
            return USER_ALREADY_EXISTS;
        }
        users.add(new User(user.getFirstName(), user.getLastName(), user.getDateOfBirth(), user.getEmail(), user.getPassword(), user.getUserType()));


        return USER_CREATED_SUCCESSFULLY;
    }

    public User loginUser(UserProfile userProfile) {
        for (User user: getAllUsers()) {
            if (user.getEmail().equals(userProfile.getEmail()) && user.getPassword().equals(userProfile.getPassword())) {
                return user;
            }
        }
        return null;
    }

    public List<User> getAllUsers() {
        return users;
    }
}
