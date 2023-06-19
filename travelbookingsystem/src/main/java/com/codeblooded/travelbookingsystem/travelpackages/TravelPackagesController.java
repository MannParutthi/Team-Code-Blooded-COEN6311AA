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

    /**
     * Creates a new travel package.
     *
     * @param travelPackage The travel package object to be created.
     * @return A response entity with a success message or an error message if the travel package already exists.
     */
    @PostMapping("/create")
    public ResponseEntity<String> createTravelPackage(@RequestBody TravelPackage travelPackage) {
        if (travelPackageRepository.existsById(travelPackage.getId())) {
            return new ResponseEntity<>(TravelPackageService.PKG_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        }

        travelPackageRepository.save(travelPackage);
        return new ResponseEntity<>(TravelPackageService.PKG_CREATED_SUCCESSFULLY, HttpStatus.OK);
    }

    /**
     * Updates an existing travel package.
     *
     * @param travelPackageId The ID of the travel package to be updated.
     * @param travelPackage   The updated travel package object.
     * @return A response entity with a success message or an error message if the travel package is not found.
     */
    @PutMapping("/update/{travelPackageId}")
    public ResponseEntity<String> updateTravelPackage(@PathVariable("travelPackageId") Long travelPackageId, @RequestBody TravelPackage travelPackage) {
        if (!travelPackageRepository.existsById(travelPackageId)) {
            return new ResponseEntity<>(TravelPackageService.TRAVEL_PACKAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        travelPackage.setId(travelPackageId);
        travelPackageRepository.save(travelPackage);
        return new ResponseEntity<>(TravelPackageService.PKG_UPDATED_SUCCESSFULLY, HttpStatus.OK);
    }

    /**
     * Retrieves all travel packages.
     *
     * @return A response entity containing all travel packages.
     */
    @GetMapping("/all")
    public ResponseEntity<Iterable<TravelPackage>> getAllTravelPackages() {
        Iterable<TravelPackage> travelPackages = travelPackageRepository.findAll();
        return ResponseEntity.ok(travelPackages);
    }

    /**
     * Searches for travel packages by destination city.
     *
     * @param destinationCity The destination city to search for.
     * @return A response entity containing the matched travel packages.
     */
    @GetMapping("/search")
    public ResponseEntity<Iterable<TravelPackage>> searchTravelPackages(@RequestParam("destinationCity") String destinationCity) {
        Iterable<TravelPackage> travelPackages = travelPackageRepository.findByDestinationCity(destinationCity);
        return ResponseEntity.ok(travelPackages);
    }
}
