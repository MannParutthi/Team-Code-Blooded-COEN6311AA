import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBookingService } from './create-booking.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {

  disableCreateBookingButton: boolean = false;

  today = new Date();

  showPaymentForm: boolean = false;

  paymentSubmitted: boolean = false;  
  

  formGroup: FormGroup = this.formBuilder.group({
    'id': [0, []],
    'customerId': [null, []],
    'travelPackageId': [null, []],
    'departureDate': [null, []],

    'creditCardNumber': [null, Validators.required],
    'expirationDate': [null, Validators.required],
    'cvv': [null, Validators.required],
    'paymentId': [null, []]
  });

  chargeCard() {
    if (this.formGroup.valid) {
      const { creditCardNumber, expirationDate, cvv } = this.formGroup.value;
  
      const expirationMonth = expirationDate.slice(0, 2);
      const expirationYear = expirationDate.slice(3);
      
      // console.log('Credit Card Number:', creditCardNumber);
      // console.log('Expiration Month:', expirationMonth);
      // console.log('Expiration Year:', expirationYear);
      // console.log('CVV:', cvv);

      const paymentData = {
        cardNumber: creditCardNumber,
        expMonth: expirationMonth,
        expYear: expirationYear,
        cvc: cvv,
        username: 'username', // Replace 'username' with the actual username value
      };

      this.createBookingService.getToken(paymentData).subscribe((response) => {
        const stripeToken = response.token;
    
        const travelPackage = this.allTravelPackagesList.find((travelPackageId) => travelPackageId.id === this.formGroup.value.travelPackageId);
        const bookingData = {
          stripeToken: stripeToken,
          username: 'username', // Replace 'username' with the actual username value
          amount: travelPackage.price,
          message: 'Booking for Travel booking system - Codeblooded',
        };
    
        this.createBookingService.chargeCard(bookingData).subscribe((res) => {
          console.log('response from chargeCard API call:->', res);
          this.formGroup.patchValue({
            paymentId: res.chargeId,
          });
          this.createBooking();
        },
        (err) => {
          console.log('error from chargeCard API call:->', err);
          this.toastr.error(err.error.message.split(';')[0]);
        });
      },
      (err) => {
        console.log('error from getToken API call:->', err);
        this.toastr.error(err.error.message.split(';')[0]);
      });

      this.paymentSubmitted = true;
    }
  }

  createBookingAPIResponse: any;

  allBookingsList: any[] = [];

  allCustomersList: any[] = [];

  allTravelPackagesList: any[] = [];

  displayedColumns: string[] = ['id', 'customerId', 'travelPackageId', 'departureDate', 'bookingStatus'];

  loggedUser: any

  constructor(private formBuilder: FormBuilder, private createBookingService: CreateBookingService, private router: Router, private toastr: ToastrService) {
    this.loggedUser = localStorage.getItem("user")
    if (!this.loggedUser) {
      this.router.navigateByUrl('/login')
    }
    this.loggedUser = JSON.parse(this.loggedUser)
  }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllTravelPackages();
    this.getAllBookings();
  }

  createBooking() {
    this.disableCreateBookingButton = true;
    console.log("createBookingFormGroup ==> " + JSON.stringify(this.formGroup.getRawValue()));
    this.createBookingService.createBooking(this.formGroup.getRawValue()).subscribe((res) => {
      this.disableCreateBookingButton = false;
      console.log("createBookingAPIResponse ==> " + res);
      this.toastr.success('Booking created successfully!!');
      this.getAllBookings();

      const bookingId = JSON.parse(res).bookingId;

      // Navigate to the payment page with the booking ID parameter.
      this.router.navigate(['/payment', bookingId]);
    }, (error) => {
      this.toastr.error(error);
    });
  }

  getAllBookings() {
    this.createBookingService.getAllBookings().subscribe((res) => {
      this.allBookingsList = res;
      if (this.loggedUser.userType == "CUSTOMER") {
        this.allBookingsList = this.allBookingsList.filter((booking) => booking.customerId === this.loggedUser.id)
      }
      console.log("getAllBookings ==> " + res);
    });
  }

  getAllCustomers() {
    this.createBookingService.getAllCustomers().subscribe((res) => {
      this.allCustomersList = res;
      console.log("getAllCustomers ==> " + res);
    });
  }

  getAllTravelPackages() {
    this.createBookingService.getAllTravelPackages().subscribe((res) => {
      this.allTravelPackagesList = res;
      console.log("getAllTravelPackages ==> " + res);
    });
  }

  getCustomerFullName(customerId: string): string {
    const customer = this.allCustomersList.find(user => user.id === customerId);
    if (customer) {
      return `${customer.firstName} ${customer.lastName}`;
    }
    return '';
  }

  getPackageDetails(travelPackageId: string): string {
    const travelpackage = this.allTravelPackagesList.find(travelpackage => travelpackage.id === travelPackageId);
    if (travelpackage) {
      return `${travelpackage.destinationCity}, ${travelpackage.destinationCountry} - $${travelpackage.price} - ${travelpackage.noOfDays} Days`;
    }
    return '';
  }

}
