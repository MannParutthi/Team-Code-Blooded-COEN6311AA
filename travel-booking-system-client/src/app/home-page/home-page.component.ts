import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private _router: Router) {
    this.loggedUser = localStorage.getItem("user")
    this.loggedUser = JSON.parse(this.loggedUser)
  }

  loggedUser: any

  ngOnInit(): void {
    if (localStorage.getItem("user")==null) {
      this._router.navigateByUrl('/login')
    }
  }

  logout() {
    localStorage.clear()
    this._router.navigateByUrl('/login')
  }

}
