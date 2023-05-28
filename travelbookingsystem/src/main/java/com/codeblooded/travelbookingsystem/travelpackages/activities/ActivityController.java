package com.codeblooded.travelbookingsystem.travelpackages.activities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping("/all")
    public ResponseEntity<Iterable<Activity>> getAllActivities() {
        return new ResponseEntity<Iterable<Activity>>(activityService.getAllActivities(), HttpStatus.OK);
    }
}
