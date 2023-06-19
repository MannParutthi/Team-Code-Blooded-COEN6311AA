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

    /**
     * Creates a new activity.
     *
     * @param activity The activity object to be created.
     * @return The created activity.
     */
    @PostMapping("/create")
    public Activity createActivity(@RequestBody Activity activity) {
        return activityRepository.save(activity);
    }

    /**
     * Retrieves all activities.
     *
     * @return A response entity containing all activities.
     */
    @GetMapping("/all")
    public ResponseEntity<Iterable<Activity>> getAllActivities() {
        Iterable<Activity> activities = activityRepository.findAll();
        return ResponseEntity.ok(activities);
    }
}
