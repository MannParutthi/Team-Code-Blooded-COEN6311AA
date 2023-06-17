import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _router: Router) {
    this.loggedUser = localStorage.getItem("user")
    this.loggedUser = JSON.parse(this.loggedUser)
  }
  loggedUser: any
  title = 'travel-booking-system-client';
}
