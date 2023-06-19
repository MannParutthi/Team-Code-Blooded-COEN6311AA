import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _router: Router) {
    this.loggedUser = localStorage.getItem("user"); // Get user data from local storage
    this.loggedUser = JSON.parse(this.loggedUser); // Parse the user data from JSON string to object
  }

  loggedUser: any; // Stores the logged-in user data

  title = 'travel-booking-system-client'; // The title of the application
}
