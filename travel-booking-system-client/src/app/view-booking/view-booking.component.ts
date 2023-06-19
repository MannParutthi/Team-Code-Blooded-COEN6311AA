import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ViewBookingService } from './view-booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.scss']
})
export class ViewBookingComponent implements OnInit {

  allBookingsList: any[] = []; // Array to store all bookings

  allCustomersList: any[] = []; // Array to store all customers

  allTravelPackagesList: any[] = []; // Array to store all travel packages

  displayedColumns: string[] = ['id', 'customerId', 'travelPackageId', 'departureDate', 'bookingStatus']; // Table columns to display

  loggedUser: any; // Stores the logged-in user data

  constructor(private ViewBookingService: ViewBookingService, private router: Router) {
    this.loggedUser = localStorage.getItem("user"); // Get user data from local storage
    if (!this.loggedUser) {
      this.router.navigateByUrl('/login'); // If user is not logged in, redirect to the login page
    }
    this.loggedUser = JSON.parse(this.loggedUser); // Parse the user data from JSON string to object
  }

  ngOnInit(): void {
    this.getAllCustomers(); // Load all customers
    this.getAllTravelPackages(); // Load all travel packages
    this.getAllBookings(); // Load all bookings
  }

  getAllBookings() {
    // Fetch all bookings from the server
    this.ViewBookingService.getAllBookings().subscribe((res) => {
      this.allBookingsList = res; // Store the received bookings in the array
      if (this.loggedUser.userType == "CUSTOMER") {
        // If the logged-in user is a customer, filter the bookings for that customer only
        this.allBookingsList = this.allBookingsList.filter((booking) => booking.customerId === this.loggedUser.id);
      }
      console.log("getAllBookings ==> " + res); // Log the response data
    });
  }

  getAllCustomers() {
    // Fetch all customers from the server
    this.ViewBookingService.getAllCustomers().subscribe((res) => {
      this.allCustomersList = res; // Store the received customers in the array
      console.log("getAllCustomers ==> " + res); // Log the response data
    });
  }

  getAllTravelPackages() {
    // Fetch all travel packages from the server
    this.ViewBookingService.getAllTravelPackages().subscribe((res) => {
      this.allTravelPackagesList = res; // Store the received travel packages in the array
      console.log("getAllTravelPackages ==> " + res); // Log the response data
    });
  }

  getCustomerFullName(customerId: string): string {
    // Get the full name of a customer by their ID
    const customer = this.allCustomersList.find(user => user.id === customerId);
    if (customer) {
      return `${customer.firstName} ${customer.lastName}`;
    }
    return '';
  }

  getPackageDetails(travelPackageId: string): string {
    // Get the details of a travel package by its ID
    const travelpackage = this.allTravelPackagesList.find(travelpackage => travelpackage.id === travelPackageId);
    if (travelpackage) {
      return `${travelpackage.destinationCity}, ${travelpackage.destinationCountry} - $${travelpackage.price} - ${travelpackage.noOfDays} Days`;
    }
    return '';
  }
}
