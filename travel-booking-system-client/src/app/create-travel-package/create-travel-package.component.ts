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

  disableCreatePackageButton: boolean = false;

  allFlightsList: any[] = [];
  allHotelsList: any[] = [];
  allActivitiesList: any[] = [];
  unFilteredHotelsList: any[] = [];
  unFilteredFlightsList: any[] = [];

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

  createPackageAPIResponse: any;

  allPackagesList: any[] = [];

  displayedColumns: string[] = ['id', 'destination', 'noOfDays', 'flight', 'hotel', 'activitiesIncluded', 'price'];

  constructor(private formBuilder: FormBuilder, private packageService: CreateTravelPackageService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getAllPackages();
    this.getAllFlights();
    this.getAllHotels();
    this.getAllActivities();
    this.addHotelDaysWithId();
  }

  createPackage() {
    let payload = this.formGroup.getRawValue()
    console.log("createPackageFormGroup ==> " + JSON.stringify(payload));

    let totalHotelDaysBooked = 0;
    payload.hotelDaysWithId.forEach((hotel: any) => {
      totalHotelDaysBooked += hotel.noOfDays;
    });

    if (totalHotelDaysBooked != payload.noOfDays) {
      this.toastr.error('Please enter valid no of days for hotels', 'Invalid Input');
      return;
    }
    this.disableCreatePackageButton = true;
    this.packageService.createPackage(payload).subscribe((res) => {
      this.disableCreatePackageButton = false;
      this.toastr.success('Package created successfully!!');
      console.log("createPackageAPIResponse ==> " + this.createPackageAPIResponse);
      this.getAllPackages();
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
      this.unFilteredFlightsList = res;
      console.log("getAllFlights ==> " + res);
    });
  }

  getAllHotels() {
    this.packageService.getAllHotels().subscribe((res) => {
      this.allHotelsList = res;
      this.unFilteredHotelsList = res;
      console.log("getAllHotels ==> " + res);
    });
  }

  getAllActivities() {
    this.packageService.getAllActivities().subscribe((res) => {
      this.allActivitiesList = res;
      console.log("getAllActivities ==> " + res);
    });
  }

  filterHotelAndFlights(destinationCity: string) {
    this.allHotelsList = this.unFilteredHotelsList.filter((hotel) => hotel.location === destinationCity);
    this.allFlightsList = this.unFilteredFlightsList.filter((flight) => flight.destination === destinationCity);
  }

  getPackagePrice() {
    let price = 0;

    this.formGroup.getRawValue().hotelDaysWithId.forEach((h: any) => {
      let priceForThisHotel = this.unFilteredHotelsList.find((hotel) => hotel.id === h.hotelId)?.pricePerRoom;
      price += (priceForThisHotel ? priceForThisHotel : 0) * (h.noOfDays ? h.noOfDays : 0);
    });

    let flightPrice = this.unFilteredFlightsList.find((flight) => flight.id === this.formGroup.getRawValue().flightId)?.pricePerSeat;
    price += (flightPrice ? flightPrice : 0);

    this.formGroup.getRawValue().activityIdsIncluded.forEach((activityId: any) => {
      let activityPrice = this.allActivitiesList.find((activity) => activity.id === activityId)?.pricePerPerson;
      price += activityPrice;
    });

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
    let flight = this.unFilteredFlightsList.find((flight) => flight.id === flightId);
    return flight.source + ' to ' + flight.destination + ' - $' + flight.pricePerSeat + ' (' + flight.airline + ')';
  }

  getHotelDetails(hotelId: any, noOfDays: any) {
    let hotel = this.unFilteredHotelsList.find((hotel) => hotel.id === hotelId);
    if (hotel.rating == 'THREE_STAR') {
      return hotel.name + ' - $' + hotel.pricePerRoom + ' (' + noOfDays + ' days)' + ' - ★★★';
    }
    else if (hotel.rating == 'FOUR_STAR') {
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
