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

  disableUpdateBookingButton: boolean = false; // Variable to track the disabling state of the update booking button

  today = new Date(); // Variable to store the current date

  formGroup: FormGroup = this.formBuilder.group({
    'id': [0, []],
    'customerId': [null, []],
    'travelPackageId': [null, []],
    'departureDate': [null, []],
    'bookingStatus': [null, []],
    'paymentId': [null, []]
  }); // Form group for managing the form controls

  updateBookingAPIResponse: any; // Variable to store the response of the update booking API

  allBookingsList: any[] = []; // Array to store all bookings

  allCustomersList: any[] = []; // Array to store all customers

  allTravelPackagesList: any[] = []; // Array to store all travel packages

  loggedUser: any; // Variable to store the logged-in user details

  displayedColumns: string[] = ['id', 'customerId', 'travelPackageId', 'departureDate', 'bookingStatus']; // Columns to display in the table

  selectedBookingId: any; // Variable to store the selected booking ID

  constructor(private formBuilder: FormBuilder, private updateBookingService: UpdateBookingService, private _router: Router, private toastr: ToastrService) {
    this.loggedUser = localStorage.getItem("user");
    if (!this.loggedUser) {
      this._router.navigateByUrl('/login'); // Redirect to login if user is not logged in
    }
    this.loggedUser = JSON.parse(this.loggedUser);
  }

  ngOnInit(): void {
    this.getAllBookings(); // Fetch all bookings on component initialization
    this.getAllTravelPackages(); // Fetch all travel packages on component initialization
    this.getAllCustomers(); // Fetch all customers on component initialization
  }

  updateBooking() {
    this.disableUpdateBookingButton = true; // Disable the update booking button
    console.log("createBookingFormGroup ==> " + JSON.stringify(this.formGroup.getRawValue())); // Log the form group data
    this.updateBookingService.updateBooking(this.formGroup.getRawValue()).subscribe((res) => {
      this.disableUpdateBookingButton = false; // Enable the update booking button
      console.log("updateBookingAPIResponse ==> " + res); // Log the response from the update booking API
      this.toastr.success('Booking details updated successfully!!'); // Show success message using Toastr
      this.getAllBookings(); // Refresh the list of all bookings
    });
  }

  getAllBookings() {
    this.updateBookingService.getAllBookings().subscribe((res) => {
      this.allBookingsList = res; // Store the fetched list of all bookings
      if (this.loggedUser.userType == "CUSTOMER") {
        this.allBookingsList = this.allBookingsList.filter((booking) => booking.customerId === this.loggedUser.id); // Filter bookings for a specific customer
      }
      console.log("getAllBookings ==> " + res); // Log the fetched list of all bookings
    });
  }

  getAllCustomers() {
    this.updateBookingService.getAllCustomers().subscribe((res) => {
      this.allCustomersList = res; // Store the fetched list of all customers
      console.log("getAllCustomers ==> " + res); // Log the fetched list of all customers
    });
  }

  getAllTravelPackages() {
    this.updateBookingService.getAllTravelPackages().subscribe((res) => {
      this.allTravelPackagesList = res; // Store the fetched list of all travel packages
      console.log("getAllTravelPackages ==> " + res); // Log the fetched list of all travel packages
    });
  }

  onBookingIdSelection() {
    console.log("selectedPackageId ==> " + this.selectedBookingId); // Log the selected booking ID
    let bookingData = this.allBookingsList.find((b) => b.id === this.selectedBookingId); // Find the booking data based on the selected booking ID
    console.log("bookingData ==> " + JSON.stringify(bookingData)); // Log the found booking data
    this.formGroup.patchValue({
      customerId: bookingData.customerId,
      travelPackageId: bookingData.travelPackageId,
      departureDate: bookingData.departureDate,
      bookingStatus: bookingData.bookingStatus,
      paymentId: bookingData.paymentId,
    }); // Update the form group with the selected booking data
  }

  getCustomerFullName(customerId: string): string {
    const customer = this.allCustomersList.find(user => user.id === customerId); // Find the customer based on the customer ID
    if (customer) {
      return `${customer.firstName} ${customer.lastName}`; // Return the full name of the customer
    }
    return ''; // Return an empty string if customer is not found
  }

  getPackageDetails(travelPackageId: string): string {
    const travelpackage = this.allTravelPackagesList.find(travelpackage => travelpackage.id === travelPackageId); // Find the travel package based on the travel package ID
    if (travelpackage) {
      return `${travelpackage.destinationCity}, ${travelpackage.destinationCountry} - $${travelpackage.price} - ${travelpackage.noOfDays} Days`; // Return the details of the travel package
    }
    return ''; // Return an empty string if travel package is not found
  }
}
