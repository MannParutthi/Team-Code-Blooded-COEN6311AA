import { Component, OnInit } from '@angular/core';
import { SearchTravelPackageService } from './search-travel-package.service';

@Component({
  selector: 'app-search-travel-package',
  templateUrl: './search-travel-package.component.html',
  styleUrls: ['./search-travel-package.component.scss']
})
export class SearchTravelPackageComponent implements OnInit {

  destinationCity: any;

  allPackagesList: any[] = [];
  allFlightsList: any[] = [];
  allHotelsList: any[] = [];
  allActivitiesList: any[] = [];

  displayedColumns: string[] = ['id', 'destination', 'noOfDays', 'flight', 'hotel', 'activitiesIncluded', 'price'];

  constructor(private packageService: SearchTravelPackageService) { }

  ngOnInit(): void {
    this.getAllPackages();
    this.getAllFlights();
    this.getAllHotels();
    this.getAllActivities();
  }

  selectedDestinationCity() {
    this.packageService.getAllPackagesByDestinationCity(this.destinationCity).subscribe((res) => {
      this.allPackagesList = res;
      console.log("getAllPackagesByDestinationCity ==> " + JSON.stringify(res));
    });
  }

  getAllPackages() {
    this.packageService.getAllPackages().subscribe((res) => {
      this.allPackagesList = res;
      console.log("getAllPackages ==> " + JSON.stringify(res));
    });
  }

  getAllFlights() {
    this.packageService.getAllFlights().subscribe((res) => {
      this.allFlightsList = res;
      console.log("getAllFlights ==> " + res);
    });
  }

  getAllHotels() {
    this.packageService.getAllHotels().subscribe((res) => {
      this.allHotelsList = res;
      console.log("getAllHotels ==> " + res);
    });
  }

  getAllActivities() {
    this.packageService.getAllActivities().subscribe((res) => {
      this.allActivitiesList = res;
      console.log("getAllActivities ==> " + res);
    });
  }

  getFlightDetails(flightId: any) {
    let flight = this.allFlightsList.find((flight) => flight.id === flightId);
    return flight.source  + ' to ' + flight.destination + ' - $' + flight.pricePerSeat + ' (' + flight.airline + ')';
  }

  getHotelDetails(hotelId: any, noOfDays: any) {
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

  getActivityDetails(activityId: any) {
    let activity = this.allActivitiesList.find((activity) => activity.id === activityId);
    return activity.name + ' - $' + activity.pricePerPerson;
  }

}
