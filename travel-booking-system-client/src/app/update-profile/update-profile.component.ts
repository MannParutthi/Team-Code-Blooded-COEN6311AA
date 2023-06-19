import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateProfileService } from './update-profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  disableUpdateProfileButton: boolean = false; // Flag to disable the update profile button

  today = new Date(); // Variable to store the current date

  loggedUser: any // Variable to store the logged-in user

  updateProfileAPIResponse: any // Variable to store the API response of the update profile request

  constructor(private _router: Router, private formBuilder: FormBuilder, private updateProfileService: UpdateProfileService, private toastr: ToastrService) { }

  formGroup: FormGroup = this.formBuilder.group({
    'firstName': [null, []],
    'lastName': [null, []],
    'dateOfBirth': [null, []],
  }); // FormGroup to handle the update profile form

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user")
    if (!this.loggedUser) {
      this._router.navigateByUrl('/login')
    }
    this.loggedUser = JSON.parse(this.loggedUser)
    this.formGroup.patchValue({
      firstName: this.loggedUser.firstName,
      lastName: this.loggedUser.lastName,
      dateOfBirth: this.loggedUser.dateOfBirth
    }); // Update the form values with the user's current profile data
  }

  updateProfile() {
    let payload = this.formGroup.getRawValue(); // Get the form values as the update payload
    payload.id = this.loggedUser.id; // Add the user ID to the payload
    payload.email = this.loggedUser.email; // Add the user email to the payload
    payload.userType = this.loggedUser.userType; // Add the user type to the payload
    payload.password = this.loggedUser.password; // Add the user password to the payload
    console.log("updatePackageFormGroup ==> " + JSON.stringify(payload));
    this.disableUpdateProfileButton = true; // Disable the update profile button to prevent multiple submissions
    this.updateProfileService.updateProfile(this.loggedUser.id, payload).subscribe((res) => {
      this.disableUpdateProfileButton = false; // Enable the update profile button after the API call is complete
      this.updateProfileAPIResponse = res; // Store the API response in a variable
      console.log("createPackageAPIResponse ==> " + this.updateProfileAPIResponse);
      this.toastr.success('Profile details updated successfully!!');
      this.loggedUser.firstName = payload.firstName; // Update the logged-in user's first name
      this.loggedUser.lastName = payload.lastName; // Update the logged-in user's last name
      this.loggedUser.dateOfBirth = payload.dateOfBirth; // Update the logged-in user's date of birth
      localStorage.setItem("user", JSON.stringify(this.loggedUser)); // Update the user data in local storage
    });
  }

}
