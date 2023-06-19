import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loggedUser: any; // Variable to store the logged-in user

  constructor(private _router: Router) {
    this.loggedUser = localStorage.getItem("user"); // Retrieve the logged-in user from local storage
    this.loggedUser = JSON.parse(this.loggedUser); // Parse the logged-in user data
  }

  ngOnInit(): void {
    if (localStorage.getItem("user") == null) {
      this._router.navigateByUrl('/login'); // If no user is found, navigate to the login page
    }
  }

  logout() {
    localStorage.clear(); // Clear the user data from local storage
    this._router.navigateByUrl('/login'); // Navigate to the login page
  }

}
