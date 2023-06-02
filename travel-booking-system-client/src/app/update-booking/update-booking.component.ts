import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateBookingService } from './update-booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.scss']
})
export class UpdateBookingComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({
    'id': [0, []],
    'customerId': [null, []],
    'travelPackageId': [null, []],
    'departureDate': [null, []],
    'bookingStatus': [null, []],
  });

  updateBookingAPIResponse: any;

  allBookingsList: any[] = [];

  loggedUser: any

  displayedColumns: string[] = ['id', 'customerId', 'travelPackageId', 'departureDate', 'bookingStatus'];
  selectedBookingId: any;

  constructor(private formBuilder: FormBuilder, private updateBookingService: UpdateBookingService, private _router: Router) {
    this.loggedUser = localStorage.getItem("user")
    if (!this.loggedUser) {
      this._router.navigateByUrl('/login')
    }
    this.loggedUser = JSON.parse(this.loggedUser)
  }

  ngOnInit(): void {
    this.getAllBookings();
  }

  updateBooking() {
    console.log("createBookingFormGroup ==> " + JSON.stringify(this.formGroup.getRawValue()));
    this.updateBookingService.updateBooking(this.formGroup.getRawValue()).subscribe((res) => {
      console.log("updateBookingAPIResponse ==> " + res);
      this.updateBookingAPIResponse = res;
      this.getAllBookings();
    });
  }

  getAllBookings() {
    this.updateBookingService.getAllBookings().subscribe((res) => {
      this.allBookingsList = res;
      if(this.loggedUser.userType == "CUSTOMER") {
        this.allBookingsList = this.allBookingsList.filter((booking) => booking.customerId === this.loggedUser.id)
      }
      console.log("getAllBookings ==> " + res);
    });
  }

  onBookingIdSelection() {
    console.log("selectedPackageId ==> " + this.selectedBookingId);
    let bookingData = this.allBookingsList.find((b) => b.id === this.selectedBookingId);
    console.log("bookingData ==> " + JSON.stringify(bookingData));
    this.formGroup.patchValue({
      customerId: bookingData.customerId,
      travelPackageId: bookingData.travelPackageId,
      departureDate: bookingData.departureDate,
      bookingStatus: bookingData.bookingStatus
    });
  }

}
