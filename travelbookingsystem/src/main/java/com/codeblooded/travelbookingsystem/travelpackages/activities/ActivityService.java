package com.codeblooded.travelbookingsystem.travelpackages.activities;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    private List<Activity> activities = List.of(
            new Activity("Rock climbing", 50, Activity.TypeOfActivity.ADVENTURE),
            new Activity("Hiking", 100, Activity.TypeOfActivity.ADVENTURE),
            new Activity("Skydiving", 150, Activity.TypeOfActivity.ADVENTURE),
            new Activity("Scuba diving", 200, Activity.TypeOfActivity.ADVENTURE),
            new Activity("Paragliding", 250, Activity.TypeOfActivity.ADVENTURE),

            new Activity("Spa", 50, Activity.TypeOfActivity.RELAXATION),
            new Activity("Yoga", 100, Activity.TypeOfActivity.RELAXATION),
            new Activity("Meditation", 150, Activity.TypeOfActivity.RELAXATION),
            new Activity("Massage", 200, Activity.TypeOfActivity.RELAXATION),
            new Activity("Sauna", 250, Activity.TypeOfActivity.RELAXATION),

            new Activity("Museum", 50, Activity.TypeOfActivity.SIGHTSEEING),
            new Activity("Zoo", 100, Activity.TypeOfActivity.SIGHTSEEING),
            new Activity("Aquarium", 150, Activity.TypeOfActivity.SIGHTSEEING),
            new Activity("Historical site", 200, Activity.TypeOfActivity.SIGHTSEEING),
            new Activity("National park", 250, Activity.TypeOfActivity.SIGHTSEEING)
    );

    public List<Activity> getAllActivities() {
        return activities;
    }
}
