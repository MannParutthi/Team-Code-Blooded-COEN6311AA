import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTravelPackageService } from './create-travel-package.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-travel-package',
  templateUrl: './create-travel-package.component.html',
  styleUrls: ['./create-travel-package.component.scss']
})
export class CreateTravelPackageComponent implements OnInit {

  // Disable button flag for create package
  disableCreatePackageButton: boolean = false;

  // Lists to store flights, hotels, activities, and unfiltered versions of hotels and flights
  allFlightsList: any[] = [];
  allHotelsList: any[] = [];
  allActivitiesList: any[] = [];
  unFilteredHotelsList: any[] = [];
  unFilteredFlightsList: any[] = [];

  // Form group for package details
  formGroup: FormGroup = this.formBuilder.group({
    destinationCity: [null, []],
    destinationCountry: [null, []],
    noOfDays: [0, []],
    price: [0, []],
    packageType: ['CUSTOM', []],
    flightId: [null, []],
    activityIdsIncluded: [[], []],
    hotelDaysWithId: this.formBuilder.array([])
  });

  // API response for create package
  createPackageAPIResponse: any;

  // List of all packages
  allPackagesList: any[] = [];

  // Columns to be displayed in the table
  displayedColumns: string[] = ['id', 'destination', 'noOfDays', 'flight', 'hotel', 'activitiesIncluded', 'price'];

  constructor(private formBuilder: FormBuilder, private packageService: CreateTravelPackageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Fetch all packages, flights, hotels, activities, and add hotel days with ID on component initialization
    this.getAllPackages();
    this.getAllFlights();
    this.getAllHotels();
    this.getAllActivities();
    this.addHotelDaysWithId();
  }

  createPackage() {
    // Get the raw form group value
    let payload = this.formGroup.getRawValue();
    console.log("createPackageFormGroup ==> " + JSON.stringify(payload));

    // Calculate the total number of hotel days booked
    let totalHotelDaysBooked = 0;
    payload.hotelDaysWithId.forEach((hotel: any) => {
      totalHotelDaysBooked += hotel.noOfDays;
    });

    // Validate that the total hotel days booked matches the total number of days in the package
    if (totalHotelDaysBooked != payload.noOfDays) {
      this.toastr.error('Please enter a valid number of days for hotels', 'Invalid Input');
      return;
    }

    // Disable the create package button
    this.disableCreatePackageButton = true;

    // Call the create package service with the payload
    this.packageService.createPackage(payload).subscribe((res) => {
      // Enable the create package button
      this.disableCreatePackageButton = false;
      this.toastr.success('Package created successfully!!');

      // Store the API response
      this.createPackageAPIResponse = res;

      console.log("createPackageAPIResponse ==> " + this.createPackageAPIResponse);

      // Fetch all packages to update the list
      this.getAllPackages();
    });
  }

  getAllPackages() {
    // Fetch all packages from the service
    this.packageService.getAllPackages().subscribe((res) => {
      // Store the list of all packages
      this.allPackagesList = res;
      console.log("getAllPackages ==> " + JSON.stringify(res));
    });
  }

  getAllFlights() {
    // Fetch all flights from the service
    this.packageService.getAllFlights().subscribe((res) => {
      // Store the list of all flights and the unfiltered list
      this.allFlightsList = res;
      this.unFilteredFlightsList = res;
      console.log("getAllFlights ==> " + res);
    });
  }

  getAllHotels() {
    // Fetch all hotels from the service
    this.packageService.getAllHotels().subscribe((res) => {
      // Store the list of all hotels and the unfiltered list
      this.allHotelsList = res;
      this.unFilteredHotelsList = res;
      console.log("getAllHotels ==> " + res);
    });
  }

  getAllActivities() {
    // Fetch all activities from the service
    this.packageService.getAllActivities().subscribe((res) => {
      // Store the list of all activities
      this.allActivitiesList = res;
      console.log("getAllActivities ==> " + res);
    });
  }

  filterHotelAndFlights(destinationCity: string) {
    // Filter hotels and flights based on the destination city
    this.allHotelsList = this.unFilteredHotelsList.filter((hotel) => hotel.location === destinationCity);
    this.allFlightsList = this.unFilteredFlightsList.filter((flight) => flight.destination === destinationCity);
  }

  getPackagePrice() {
    let price = 0;

    // Calculate the price for hotels
    this.formGroup.getRawValue().hotelDaysWithId.forEach((h: any) => {
      let priceForThisHotel = this.unFilteredHotelsList.find((hotel) => hotel.id === h.hotelId)?.pricePerRoom;
      price += (priceForThisHotel ? priceForThisHotel : 0) * (h.noOfDays ? h.noOfDays : 0);
    });

    // Calculate the price for the flight
    let flightPrice = this.unFilteredFlightsList.find((flight) => flight.id === this.formGroup.getRawValue().flightId)?.pricePerSeat;
    price += (flightPrice ? flightPrice : 0);

    // Calculate the price for activities
    this.formGroup.getRawValue().activityIdsIncluded.forEach((activityId: any) => {
      let activityPrice = this.allActivitiesList.find((activity) => activity.id === activityId)?.pricePerPerson;
      price += activityPrice;
    });

    // Update the price field in the form group
    this.formGroup.patchValue({ price: price });
  }

  get hotelDaysWithId() {
    return this.formGroup.controls['hotelDaysWithId'] as FormArray;
  }

  addHotelDaysWithId() {
    const control = this.formGroup.controls['hotelDaysWithId'] as FormArray;
    let totalNoOfDaysOfPackage = this.formGroup.getRawValue().noOfDays ? this.formGroup.getRawValue().noOfDays : 0;

    if (control.length > 0) {
      let totalNoOfDaysBooked = 0;
      for (let i = 0; i < control.length; i++) {
        totalNoOfDaysBooked += control.get(i.toString())?.get('noOfDays')?.value;
      }
      if (totalNoOfDaysBooked >= totalNoOfDaysOfPackage) {
        let lastHotelEntryDays = control.get((control.length - 1).toString())?.get('noOfDays')?.value;
        control.get((control.length - 1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage - (totalNoOfDaysBooked - lastHotelEntryDays));
      }
      else if (control.get((control.length - 1).toString())?.get('hotelId')?.value == null || control.get((control.length - 1).toString())?.get('noOfDays')?.value == 0) {
        control.get((control.length - 1).toString())?.get('hotelId')?.setValue(this.allHotelsList[0].id);
        control.get((control.length - 1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage - totalNoOfDaysBooked);
      }
      else {
        control.push(this.formBuilder.group({
          'hotelId': [null],
          'noOfDays': [0]
        }));
        control.get((control.length - 1).toString())?.get('hotelId')?.setValue(this.allHotelsList[0].id);
        control.get((control.length - 1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage - totalNoOfDaysBooked);
      }
    }
    else if (control.length === 0) {
      control.push(this.formBuilder.group({
        'hotelId': [null],
        'noOfDays': [0]
      }));
      if (totalNoOfDaysOfPackage) {
        control.get((control.length - 1).toString())?.get('hotelId')?.setValue(this.allHotelsList[0].id);
        control.get((control.length - 1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage);
      }
    }
  }

  removeHotelDaysWithId(index: any) {
    const control = this.formGroup.controls['hotelDaysWithId'] as FormArray;
    control.removeAt(index);
  }

  getFlightDetails(flightId: any) {
    // Retrieve flight details by ID
    let flight = this.unFilteredFlightsList.find((flight) => flight.id === flightId);
    return flight.source + ' to ' + flight.destination + ' - $' + flight.pricePerSeat + ' (' + flight.airline + ')';
  }

  getHotelDetails(hotelId: any, noOfDays: any) {
    // Retrieve hotel details by ID and format the string
    let hotel = this.unFilteredHotelsList.find((hotel) => hotel.id === hotelId);
    if (hotel.rating == 'THREE_STAR') {
      return hotel.name + ' - $' + hotel.pricePerRoom + ' (' + noOfDays + ' days)' + ' - ★★★';
    } else if (hotel.rating == 'FOUR_STAR') {
      return hotel.name + ' - $' + hotel.pricePerRoom + ' (' + noOfDays + ' days)' + ' - ★★★★';
    } else {
      return hotel.name + ' - $' + hotel.pricePerRoom + ' (' + noOfDays + ' days)' + ' - ★★★★★';
    }
  }

  getActivityDetails(activityId: any) {
    // Retrieve activity details by ID and format the string
    let activity = this.allActivitiesList.find((activity) => activity.id === activityId);
    return activity.name + ' - $' + activity.pricePerPerson;
  }
}
