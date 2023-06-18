import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { GetReportComponent } from './get-report/get-report.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { CreateTravelPackageComponent } from './create-travel-package/create-travel-package.component';
import { UpdateBookingComponent } from './update-booking/update-booking.component';
import { UpdateTravelPackageComponent } from './update-travel-package/update-travel-package.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SearchTravelPackageComponent } from './search-travel-package/search-travel-package.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "login", component: UserLoginComponent },
  { path: "home", component: HomePageComponent },
  { path: "create-user", component: CreateCustomerComponent },
  { path: "create-travel-package", component: CreateTravelPackageComponent },
  { path: "update-travel-package", component: UpdateTravelPackageComponent },
  { path: "search-travel-package", component: SearchTravelPackageComponent },
  { path: "create-booking", component: CreateBookingComponent },
  { path: "update-booking", component: UpdateBookingComponent },
  { path: "get-report", component: GetReportComponent },
  { path: "view-booking", component: ViewBookingComponent },
  { path: "update-profile", component: UpdateProfileComponent },
  { path: "**", redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
