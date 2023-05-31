package com.codeblooded.travelbookingsystem.travelpackages.activities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/activities")
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    public ActivityController(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @PostMapping("/create")
    public Activity createActivity(@RequestBody Activity activity) {
        return activityRepository.save(activity);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Activity>> getAllActivities() {
        Iterable<Activity> activities = activityRepository.findAll();
        return ResponseEntity.ok(activities);
    }
}
