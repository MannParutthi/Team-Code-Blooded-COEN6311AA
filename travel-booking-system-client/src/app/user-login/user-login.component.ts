import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginService } from './user-login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({
    'email': [null, Validators.required], // Form control for email input field
    'password': [null, Validators.required] // Form control for password input field
  });

  loggedUser: any; // Stores the logged-in user data

  constructor(private _router: Router, private formBuilder: FormBuilder, private userLoginService: UserLoginService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    // If user is already logged in, redirect to home page
    if(localStorage.getItem("user")!=null) {
      this._router.navigateByUrl('/home')
    }
  }

  loginUser() {
    // Send a login request to the server with form data
    this.userLoginService.loginUser(this.formGroup.getRawValue()).subscribe(
      (res) => {
        this.loggedUser = res; // Store the logged-in user data
        localStorage.setItem("user", JSON.stringify(res)) // Store user data in local storage
        this.toastr.success('Login Successful', 'Welcome'); // Show success message using Toastr
        this._router.navigateByUrl('/home'); // Redirect to home page after successful login
      },
      (error) => {
        this.toastr.error('Incorrect username or password', 'Login Failed'); // Show error message using Toastr
      }
    );
  }

}
