import { Component, OnInit } from '@angular/core';
import { GetReportService } from './get-report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-report',
  templateUrl: './get-report.component.html',
  styleUrls: ['./get-report.component.scss']
})
export class GetReportComponent implements OnInit {

  reportData: any[] = []; // Array to store the report data

  loggedUser: any; // Variable to store the logged-in user

  displayedColumns: string[] = ['packageid', 'destination', 'totalNumberOfBookings', 'totalRevenueGenerated']; // Columns to be displayed in the report table

  constructor(private getReportService: GetReportService, private _router: Router) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user"); // Retrieve the logged-in user from local storage
    if (!this.loggedUser) {
      this._router.navigateByUrl('/login'); // If no user is found, navigate to the login page
    }
    this.loggedUser = JSON.parse(this.loggedUser); // Parse the logged-in user data
    if (this.loggedUser.userType == "CUSTOMER") {
      this._router.navigateByUrl('/home'); // If the user is a customer, navigate to the home page
    }
    this.getReport(); // Call the function to fetch the report data
  }

  getReport() {
    this.getReportService.getReport().subscribe((data: any) => {
      this.reportData = data; // Store the fetched report data in the reportData array
      console.log("getReport ==> " + data); // Print the report data to the console
    });
  }

}
