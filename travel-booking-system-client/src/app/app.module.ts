import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateTravelPackageComponent } from './create-travel-package/create-travel-package.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { GetReportComponent } from './get-report/get-report.component';
import { UpdateBookingComponent } from './update-booking/update-booking.component';
import { UpdateTravelPackageComponent } from './update-travel-package/update-travel-package.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SearchTravelPackageComponent } from './search-travel-package/search-travel-package.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateCustomerComponent,
    CreateTravelPackageComponent,
    CreateBookingComponent,
    UpdateBookingComponent,
    UpdateTravelPackageComponent,
    UserLoginComponent,
    UpdateProfileComponent,
    GetReportComponent,
    SearchTravelPackageComponent,
    ViewBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatListModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
