import { Component, OnInit } from '@angular/core';
import { SearchTravelPackageService } from './search-travel-package.service';

@Component({
  selector: 'app-search-travel-package',
  templateUrl: './search-travel-package.component.html',
  styleUrls: ['./search-travel-package.component.scss']
})
export class SearchTravelPackageComponent implements OnInit {

  destinationCity: any; // Variable to store the selected destination city

  allPackagesList: any[] = []; // Array to store all travel packages
  allFlightsList: any[] = []; // Array to store all flights
  allHotelsList: any[] = []; // Array to store all hotels
  allActivitiesList: any[] = []; // Array to store all activities

  displayedColumns: string[] = ['id', 'destination', 'noOfDays', 'flight', 'hotel', 'activitiesIncluded', 'price']; // Array of column names for table display

  constructor(private packageService: SearchTravelPackageService) { }

  ngOnInit(): void {
    this.getAllPackages(); // Fetch all travel packages
    this.getAllFlights(); // Fetch all flights
    this.getAllHotels(); // Fetch all hotels
    this.getAllActivities(); // Fetch all activities
  }

  selectedDestinationCity() {
    // Get all packages for the selected destination city
    this.packageService.getAllPackagesByDestinationCity(this.destinationCity).subscribe((res) => {
      this.allPackagesList = res; // Update the array with the retrieved packages
      console.log("getAllPackagesByDestinationCity ==> " + JSON.stringify(res));
    });
  }

  getAllPackages() {
    // Get all travel packages
    this.packageService.getAllPackages().subscribe((res) => {
      this.allPackagesList = res; // Update the array with the retrieved packages
      console.log("getAllPackages ==> " + JSON.stringify(res));
    });
  }

  getAllFlights() {
    // Get all flights
    this.packageService.getAllFlights().subscribe((res) => {
      this.allFlightsList = res; // Update the array with the retrieved flights
      console.log("getAllFlights ==> " + res);
    });
  }

  getAllHotels() {
    // Get all hotels
    this.packageService.getAllHotels().subscribe((res) => {
      this.allHotelsList = res; // Update the array with the retrieved hotels
      console.log("getAllHotels ==> " + res);
    });
  }

  getAllActivities() {
    // Get all activities
    this.packageService.getAllActivities().subscribe((res) => {
      this.allActivitiesList = res; // Update the array with the retrieved activities
      console.log("getAllActivities ==> " + res);
    });
  }

  getFlightDetails(flightId: any) { // Formatting flight details for display
    let flight = this.allFlightsList.find((flight) => flight.id === flightId);
    return flight.source  + ' to ' + flight.destination + ' - $' + flight.pricePerSeat + ' (' + flight.airline + ')';
  }

  getHotelDetails(hotelId: any, noOfDays: any) { // Formatting hotel details for display
    let hotel = this.allHotelsList.find((hotel) => hotel.id === hotelId);
    if(hotel.rating == 'THREE_STAR') {
      return hotel.name + ' - $' + hotel.pricePerRoom + ' (' + noOfDays + ' days)' + ' - ★★★';
    }
    else if(hotel.rating == 'FOUR_STAR') {
      return hotel.name + ' - $' + hotel.pricePerRoom + ' (' + noOfDays + ' days)' + ' - ★★★★';
    }
    else {
      return hotel.name + ' - $' + hotel.pricePerRoom + ' (' + noOfDays + ' days)' + ' - ★★★★★';
    }
  }

  getActivityDetails(activityId: any) { // Formatting activity details for display
    let activity = this.allActivitiesList.find((activity) => activity.id === activityId);
    return activity.name + ' - $' + activity.pricePerPerson;
  }

}
