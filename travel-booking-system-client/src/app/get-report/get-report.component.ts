import { Component, OnInit } from '@angular/core';
import { GetReportService } from './get-report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-report',
  templateUrl: './get-report.component.html',
  styleUrls: ['./get-report.component.scss']
})
export class GetReportComponent implements OnInit {

  reportData: any[] = [];

  loggedUser: any

  displayedColumns: string[] = ['packageid', 'destination', 'totalNumberOfBookings', 'totalRevenueGenerated'];

  constructor(private getReportService: GetReportService, private _router: Router) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user")
    if(!this.loggedUser) {
      this._router.navigateByUrl('/login')
    }
    this.loggedUser = JSON.parse(this.loggedUser)
    if(this.loggedUser.userType == "CUSTOMER") {
      this._router.navigateByUrl('/home')
    }
    this.getReport();
  }

  getReport() {
    this.getReportService.getReport().subscribe((data: any) => {
      this.reportData = data;
      console.log("getReport ==> " + data);
    });
  }

}
