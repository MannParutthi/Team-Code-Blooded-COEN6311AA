import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateBookingService } from './update-booking.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.scss']
})
export class UpdateBookingComponent implements OnInit {

  disableUpdateBookingButton: boolean = false;

  today = new Date();

  formGroup: FormGroup = this.formBuilder.group({
    'id': [0, []],
    'customerId': [null, []],
    'travelPackageId': [null, []],
    'departureDate': [null, []],
    'bookingStatus': [null, []],
  });

  updateBookingAPIResponse: any;

  allBookingsList: any[] = [];
  allCustomersList: any[] = [];

  allTravelPackagesList: any[] = [];

  loggedUser: any

  displayedColumns: string[] = ['id', 'customerId', 'travelPackageId', 'departureDate', 'bookingStatus'];
  selectedBookingId: any;

  constructor(private formBuilder: FormBuilder, private updateBookingService: UpdateBookingService, private _router: Router, private toastr: ToastrService) {
    this.loggedUser = localStorage.getItem("user")
    if (!this.loggedUser) {
      this._router.navigateByUrl('/login')
    }
    this.loggedUser = JSON.parse(this.loggedUser)
  }

  ngOnInit(): void {
    this.getAllBookings();
    this.getAllTravelPackages();
    this.getAllCustomers();
  }

  updateBooking() {
    this.disableUpdateBookingButton = true;
    console.log("createBookingFormGroup ==> " + JSON.stringify(this.formGroup.getRawValue()));
    this.updateBookingService.updateBooking(this.formGroup.getRawValue()).subscribe((res) => {
      this.disableUpdateBookingButton = false;
      console.log("updateBookingAPIResponse ==> " + res);
      this.toastr.success('Booking details updated successfully!!');
      this.getAllBookings();
    });
  }

  getAllBookings() {
    this.updateBookingService.getAllBookings().subscribe((res) => {
      this.allBookingsList = res;
      if (this.loggedUser.userType == "CUSTOMER") {
        this.allBookingsList = this.allBookingsList.filter((booking) => booking.customerId === this.loggedUser.id)
      }
      console.log("getAllBookings ==> " + res);
    });
  }

  getAllCustomers() {
    this.updateBookingService.getAllCustomers().subscribe((res) => {
      this.allCustomersList = res;
      console.log("getAllCustomers ==> " + res);
    });
  }

  getAllTravelPackages() {
    this.updateBookingService.getAllTravelPackages().subscribe((res) => {
      this.allTravelPackagesList = res;
      console.log("getAllTravelPackages ==> " + res);
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

  getCustomerFullName(customerId: string): string {
    const customer = this.allCustomersList.find(user => user.id === customerId);
    if (customer) {
      return `${customer.firstName} ${customer.lastName}`;
    }
    return '';
  }

  getPackageDetails(travelPackageId: string): string {
    const travelpackage = this.allTravelPackagesList.find(travelpackage => travelpackage.id === travelPackageId);
    if (travelpackage) {
      return `${travelpackage.destinationCity}, ${travelpackage.destinationCountry} - $${travelpackage.price} - ${travelpackage.noOfDays} Days`;
    }
    return '';
  }

}
