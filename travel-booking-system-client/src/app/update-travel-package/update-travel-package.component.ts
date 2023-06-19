import { Component, OnInit } from '@angular/core';
import { UpdateTravelPackageService } from './update-travel-package.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-travel-package',
  templateUrl: './update-travel-package.component.html',
  styleUrls: ['./update-travel-package.component.scss']
})
export class UpdateTravelPackageComponent implements OnInit {

  disableUpdatePackageButton: boolean = false; // Flag to disable the update package button

  allFlightsList: any[] = []; // List to store all flights
  allHotelsList: any[] = []; // List to store all hotels
  allActivitiesList: any[] = []; // List to store all activities
  unFilteredHotelsList: any[] = []; // List to store unfiltered hotels
  unFilteredFlightsList: any[] = []; // List to store unfiltered flights

  formGroup: FormGroup = this.formBuilder.group({
    destinationCity: [null, []],
    destinationCountry: [null, []],
    noOfDays: [0, []],
    price: [0, []],
    packageType: ['CUSTOM', []],
    flightId: [null, []],
    activityIdsIncluded: [[], []],
    hotelDaysWithId: this.formBuilder.array([])
  }); // FormGroup to handle the update travel package form

  selectedTravelPackageId: any; // Variable to store the selected travel package ID

  updatePackageAPIResponse: any; // Variable to store the API response of the update package request

  allPackagesList: any[] = []; // List to store all travel packages

  displayedColumns: string[] = ['id', 'destination', 'noOfDays', 'flight', 'hotel', 'activitiesIncluded', 'price']; // Columns to be displayed in the table

  loggedUser: any; // Variable to store the logged-in user

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private packageService: UpdateTravelPackageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('user'); // Get the logged-in user from local storage
    if (!this.loggedUser) { // If no user is logged in, redirect to login page
      this._router.navigateByUrl('/login');
    }
    this.loggedUser = JSON.parse(this.loggedUser); // Parse the logged-in user
    if (this.loggedUser.userType == 'CUSTOMER') { // If the logged-in user is a customer, redirect to home page
      this._router.navigateByUrl('/home');
    }
    this.getAllPackages(); // Fetch all travel packages
    this.getAllFlights(); // Fetch all flights
    this.getAllHotels(); // Fetch all hotels
    this.getAllActivities(); // Fetch all activities
    this.addHotelDaysWithId(); // Add a hotel entry to the form
  }

  selectedPackageId() {
    console.log('selectedPackageId ==> ' + this.selectedTravelPackageId);
    let packageData = this.allPackagesList.find((p) => p.id === this.selectedTravelPackageId); // Get the selected package data
    console.log('packageData ==> ' + JSON.stringify(packageData));
    const control = this.formGroup.controls['hotelDaysWithId'] as FormArray; // Get the hotelDaysWithId FormArray
    if (control.length < packageData.hotelDaysWithId.length) {
      let entriesToBeAdded = packageData.hotelDaysWithId.length - control.length;
      for (let i = 0; i < entriesToBeAdded; i++) {
        control.push(
          this.formBuilder.group({
            hotelId: [null],
            noOfDays: [0]
          })
        );
      }
    } else if (control.length > packageData.hotelDaysWithId.length) {
      let entriesToBeRemoved = control.length - packageData.hotelDaysWithId.length;
      for (let i = 0; i < entriesToBeRemoved; i++) {
        control.removeAt(control.length - 1);
      }
    }
    this.formGroup.patchValue(packageData);
    this.filterHotelAndFlights(packageData.destinationCity);
  }

  updatePackage() { // Update the selected package
    let payload = this.formGroup.getRawValue();
    payload.id = this.selectedTravelPackageId;
    console.log('updatePackageFormGroup ==> ' + JSON.stringify(payload));

    let totalHotelDaysBooked = 0;
    payload.hotelDaysWithId.forEach((hotel: any) => {
      totalHotelDaysBooked += hotel.noOfDays;
    });

    if (totalHotelDaysBooked != payload.noOfDays) {
      this.toastr.error('Please enter a valid number of days for hotels', 'Invalid Input');
      return;
    }
    this.disableUpdatePackageButton = true;
    this.packageService.updatePackage(this.selectedTravelPackageId, payload).subscribe((res) => {
      this.disableUpdatePackageButton = false;
      this.updatePackageAPIResponse = res;
      console.log("createPackageAPIResponse ==> " + this.updatePackageAPIResponse);
      this.toastr.success('Package details updated successfully!!');
      this.getAllPackages();
    });
  }

  getAllPackages() { // Fetch all travel packages
    this.packageService.getAllPackages().subscribe((res) => {
      this.allPackagesList = res;
      console.log('getAllPackages ==> ' + JSON.stringify(res));
    });
  }

  getAllFlights() { // Fetch all flights
    this.packageService.getAllFlights().subscribe((res) => {
      this.allFlightsList = res;
      this.unFilteredFlightsList = res;
      console.log('getAllFlights ==> ' + res);
    });
  }

  getAllHotels() { // Fetch all hotels
    this.packageService.getAllHotels().subscribe((res) => {
      this.allHotelsList = res;
      this.unFilteredHotelsList = res;
      console.log('getAllHotels ==> ' + res);
    });
  }

  getAllActivities() { // Fetch all activities
    this.packageService.getAllActivities().subscribe((res) => {
      this.allActivitiesList = res;
      console.log('getAllActivities ==> ' + res);
    });
  }

  filterHotelAndFlights(destinationCity: string) { // Filter hotels and flights based on the selected destination city
    this.allHotelsList = this.unFilteredHotelsList.filter((hotel) => hotel.location === destinationCity);
    this.allFlightsList = this.unFilteredFlightsList.filter((flight) => flight.destination === destinationCity);
  }

  getPackagePrice() { // Calculate the package price
    let price = 0;

    this.formGroup.getRawValue().hotelDaysWithId.forEach((h: any) => {
      let priceForThisHotel = this.unFilteredHotelsList.find((hotel) => hotel.id === h.hotelId)?.pricePerRoom;
      price += (priceForThisHotel ? priceForThisHotel : 0) * (h.noOfDays ? h.noOfDays : 0);
    });

    let flightPrice = this.unFilteredFlightsList.find((flight) => flight.id === this.formGroup.getRawValue().flightId)?.pricePerSeat;
    price += flightPrice ? flightPrice : 0;

    this.formGroup.getRawValue().activityIdsIncluded.forEach((activityId: any) => {
      let activityPrice = this.allActivitiesList.find((activity) => activity.id === activityId)?.pricePerPerson;
      price += activityPrice ? activityPrice : 0;
    });

    this.formGroup.patchValue({ price: price });
  }

  get hotelDaysWithId() { // Getter for hotelDaysWithId FormArray
    return this.formGroup.controls['hotelDaysWithId'] as FormArray;
  }

  addHotelDaysWithId() { // Add a hotel entry to the form
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
      } else if (
        control.get((control.length - 1).toString())?.get('hotelId')?.value == null ||
        control.get((control.length - 1).toString())?.get('noOfDays')?.value == 0
      ) {
        control.get((control.length - 1).toString())?.get('hotelId')?.setValue(this.allHotelsList[0].id);
        control.get((control.length - 1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage - totalNoOfDaysBooked);
      } else {
        control.push(
          this.formBuilder.group({
            hotelId: [null],
            noOfDays: [0]
          })
        );
        control.get((control.length - 1).toString())?.get('hotelId')?.setValue(this.allHotelsList[0].id);
        control.get((control.length - 1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage - totalNoOfDaysBooked);
      }
    } else if (control.length === 0) {
      control.push(
        this.formBuilder.group({
          hotelId: [null],
          noOfDays: [0],
        })
      );
      if (totalNoOfDaysOfPackage) {
        control.get((control.length - 1).toString())?.get('hotelId')?.setValue(this.allHotelsList[0].id);
        control.get((control.length - 1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage);
      }
    }
  }

  removeHotelDaysWithId(index: any) { // Remove a hotel entry from the form
    const control = this.formGroup.controls['hotelDaysWithId'] as FormArray;
    control.removeAt(index);
  }

  getFlightDetails(flightId: any) { // Get flight details based on the selected flight ID for display
    let flight = this.unFilteredFlightsList.find((flight) => flight.id === flightId);
    return flight.source + ' to ' + flight.destination + ' - $' + flight.pricePerSeat + ' (' + flight.airline + ')';
  }

  getHotelDetails(hotelId: any, noOfDays: any) { // Get hotel details based on the selected hotel ID for display
    let hotel = this.unFilteredHotelsList.find((hotel) => hotel.id === hotelId);
    if (hotel.rating == 'THREE_STAR') {
      return hotel.name + ' - $' + hotel.pricePerRoom + ' (' + noOfDays + ' days)' + ' - ★★★';
    } else if (hotel.rating == 'FOUR_STAR') {
      return hotel.name + ' - $' + hotel.pricePerRoom + ' (' + noOfDays + ' days)' + ' - ★★★★';
    } else {
      return hotel.name + ' - $' + hotel.pricePerRoom + ' (' + noOfDays + ' days)' + ' - ★★★★★';
    }
  }

  getActivityDetails(activityId: any) { // Get activity details based on the selected activity ID for display
    let activity = this.allActivitiesList.find((activity) => activity.id === activityId);
    return activity.name + ' - $' + activity.pricePerPerson;
  }
}
