import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CreateTravelPackageService } from './create-travel-package.service';

@Component({
  selector: 'app-create-travel-package',
  templateUrl: './create-travel-package.component.html',
  styleUrls: ['./create-travel-package.component.scss']
})
export class CreateTravelPackageComponent implements OnInit {
  
  allFlightsList: any[] = [];
  allHotelsList: any[] = [];
  unFilteredHotelsList: any[] = [];
  unFilteredFlightsList: any[] = [];
  
  formGroup: FormGroup = this.formBuilder.group({
    destinationCity: [null, []],
    destinationCountry: [null, []],
    noOfDays: [0, []],
    packageType: ['CUSTOM', []],
    flightId: [null, []],
    hotelDaysWithId: this.formBuilder.array([])
  });

  createPackageAPIResponse: any;

  constructor(private formBuilder: FormBuilder, private packageService: CreateTravelPackageService) { }

  ngOnInit(): void {
  }

  createPackage() {
    let payload = this.formGroup.getRawValue()
    console.log("createPackageFormGroup ==> " + JSON.stringify(payload));
    // payload.activitiesIncluded = payload.activitiesIncluded.split(',');
    this.packageService.createPackage(payload).subscribe((res) => {
      this.createPackageAPIResponse = res;
      console.log("createPackageAPIResponse ==> " + this.createPackageAPIResponse);
    });
  }

  get hotelDaysWithId() {
    return this.formGroup.controls['hotelDaysWithId'] as FormArray;
  }

  addHotelDaysWithId() {
    const control = this.formGroup.controls['hotelDaysWithId'] as FormArray;
    let totalNoOfDaysOfPackage = this.formGroup.getRawValue().noOfDays ? this.formGroup.getRawValue().noOfDays : 0;
    if(control.length > 0) {
      let totalNoOfDaysBooked = 0;
      for(let i=0; i<control.length; i++) {
        totalNoOfDaysBooked += control.get(i.toString())?.get('noOfDays')?.value;
      }
      if(totalNoOfDaysBooked >= totalNoOfDaysOfPackage) {
        let lastHotelEntryDays = control.get((control.length-1).toString())?.get('noOfDays')?.value;
        control.get((control.length-1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage - (totalNoOfDaysBooked - lastHotelEntryDays));
      }
      else if(control.get((control.length-1).toString())?.get('hotelId')?.value == null || control.get((control.length-1).    toString())?.get('noOfDays')?.value == 0) {
        control.get((control.length-1).toString())?.get('hotelId')?.setValue(this.allHotelsList[0].id);
        control.get((control.length-1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage - totalNoOfDaysBooked);
      }
      else {
        control.push(this.formBuilder.group({
          'hotelId': [null],
          'noOfDays': [0]
        }));
        control.get((control.length-1).toString())?.get('hotelId')?.setValue(this.allHotelsList[0].id);
        control.get((control.length-1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage - totalNoOfDaysBooked);
      }
    }
    else if(control.length === 0) {
      control.push(this.formBuilder.group({
        'hotelId': [null],
        'noOfDays': [0]
      }));
      if(totalNoOfDaysOfPackage) {
        control.get((control.length-1).toString())?.get('hotelId')?.setValue(this.allHotelsList[0].id);
        control.get((control.length-1).toString())?.get('noOfDays')?.setValue(totalNoOfDaysOfPackage);
      }
    }
  }

  removeHotelDaysWithId(index: any) {
    const control = this.formGroup.controls['hotelDaysWithId'] as FormArray;
    control.removeAt(index);
  }

  getFlightDetails(flightId: any) {
    let flight = this.unFilteredFlightsList.find((flight) => flight.id === flightId);
    return flight.source  + ' to ' + flight.destination + ' - $' + flight.pricePerSeat + ' (' + flight.airline + ')';
  }

  getHotelDetails(hotelId: any, noOfDays: any) {
    let hotel = this.unFilteredHotelsList.find((hotel) => hotel.id === hotelId);
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

}
