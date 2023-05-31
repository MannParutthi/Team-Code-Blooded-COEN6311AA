package com.codeblooded.travelbookingsystem.travelpackages;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {
    Iterable<TravelPackage> findByDestinationCity(String destinationCity);
}
