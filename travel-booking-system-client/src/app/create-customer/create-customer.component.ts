import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateCustomerService } from './create-customer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  // Disable button flag for create customer
  disableCreateCustomerButton: boolean = false;

  // Form group for customer details
  formGroup: FormGroup;

  // API response for create customer
  createCustomerAPIResponse: any;

  // List of all customers
  allCustomersList: any[] = [];

  // Today's date
  today = new Date();

  // Columns to be displayed in the table
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'userType', 'dateOfBirth', 'email'];

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private createCustomerService: CreateCustomerService,
    private toastr: ToastrService
  ) {
    // Initialize the form group with form controls and validators
    this.formGroup = this.formBuilder.group({
      id: [0],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      userType: [null, Validators.required],
      dateOfBirth: ['', [Validators.required, this.maxDateValidator.bind(this)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch all customers on component initialization
    this.getAllCustomers();

    // Check if the user is already logged in, if so, navigate to the home page
    if (localStorage.getItem('user') != null) {
      this._router.navigateByUrl('/home');
    }
  }

  createCustomer() {
    // Disable the create customer button to prevent multiple clicks
    this.disableCreateCustomerButton = true;

    // Check if the form is valid
    if (this.formGroup.valid) {
      // Call the create customer service with form group values
      this.createCustomerService.createCustomer(this.formGroup.getRawValue()).subscribe((res) => {
        // Enable the create customer button
        this.disableCreateCustomerButton = false;
        this.toastr.success('User created successfully!!');

        // Store the API response
        this.createCustomerAPIResponse = res;

        // Refresh the list of all customers
        this.getAllCustomers();
      });
    } else {
      // Mark all form controls as touched to display validation errors
      this.formGroup.markAllAsTouched();
    }
  }

  getAllCustomers() {
    // Fetch all customers from the service
    this.createCustomerService.getAllCustomers().subscribe((res) => {
      // Store the list of all customers
      this.allCustomersList = res;
    });
  }

  maxDateValidator(control: AbstractControl): ValidationErrors | null {
    // Validate that the selected date is not greater than the current date
    const selectedDate = control.value;
    const currentDate = new Date();

    return selectedDate <= currentDate ? null : { max: true };
  }
}
