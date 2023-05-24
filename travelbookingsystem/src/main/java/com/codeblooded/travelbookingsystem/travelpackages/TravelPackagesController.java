package com.codeblooded.travelbookingsystem.travelpackages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/tourist-packages")
public class TravelPackagesController {
    @Autowired
    private TravelPackageService travelPackageService;

    @PostMapping("/create")
    public ResponseEntity<String> createTravelPackage(@RequestBody TravelPackage travelPackage) {

        String response = travelPackageService.createTravelPackage(travelPackage);
        if(response == TravelPackageService.PKG_ALREADY_EXISTS) {
            return new ResponseEntity<String>(response, HttpStatus.OK);
        }
        return new ResponseEntity<String>(response, HttpStatus.CREATED);
    }
}
