package com.codeblooded.travelbookingsystem.travelpackages;

import com.codeblooded.travelbookingsystem.travelpackages.activities.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/tourist-packages")
public class TravelPackagesController {
    @Autowired
    private TravelPackageRepository travelPackageRepository;

    @Autowired
    public TravelPackagesController(TravelPackageRepository travelPackageRepository) {
        this.travelPackageRepository = travelPackageRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createTravelPackage(@RequestBody TravelPackage travelPackage) {
        if (travelPackageRepository.existsById(travelPackage.getId())) {
            return new ResponseEntity<>(TravelPackageService.PKG_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        }

        travelPackageRepository.save(travelPackage);
        return new ResponseEntity<>(TravelPackageService.PKG_CREATED_SUCCESSFULLY, HttpStatus.OK);
    }

    @PutMapping("/update/{travelPackageId}")
    public ResponseEntity<String> updateTravelPackage(@PathVariable("travelPackageId") Long travelPackageId, @RequestBody TravelPackage travelPackage) {
        if (!travelPackageRepository.existsById(travelPackageId)) {
            return new ResponseEntity<>(TravelPackageService.TRAVEL_PACKAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        travelPackage.setId(travelPackageId);
        travelPackageRepository.save(travelPackage);
        return new ResponseEntity<>(TravelPackageService.PKG_UPDATED_SUCCESSFULLY, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<TravelPackage>> getAllTravelPackages() {
        Iterable<TravelPackage> travelPackages = travelPackageRepository.findAll();
        return ResponseEntity.ok(travelPackages);
    }

    @GetMapping("/search")
    public ResponseEntity<Iterable<TravelPackage>> searchTravelPackages(@RequestParam("destinationCity") String destinationCity) {
        Iterable<TravelPackage> travelPackages = travelPackageRepository.findByDestinationCity(destinationCity);
        return ResponseEntity.ok(travelPackages);
    }
}
