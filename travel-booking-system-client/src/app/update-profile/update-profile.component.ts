import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateProfileService } from './update-profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  loggedUser: any

  updateProfileAPIResponse: any

  constructor(private _router: Router, private formBuilder: FormBuilder, private updateProfileService: UpdateProfileService) { }

  formGroup: FormGroup = this.formBuilder.group({
    'firstName': [null, []],
    'lastName': [null, []],
    'dateOfBirth': [null, []],
  });

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user")
    if(!this.loggedUser) {
      this._router.navigateByUrl('/login')
    }
    this.loggedUser = JSON.parse(this.loggedUser)
    this.formGroup.patchValue({
      firstName: this.loggedUser.firstName,
      lastName: this.loggedUser.lastName,
      dateOfBirth: this.loggedUser.dateOfBirth
    });
  }

  updateProfile() {
    let payload = this.formGroup.getRawValue();
    payload.id = this.loggedUser.id;
    payload.email = this.loggedUser.email
    payload.userType = this.loggedUser.userType
    payload.password = this.loggedUser.password
    console.log("updatePackageFormGroup ==> " + JSON.stringify(payload));
    this.updateProfileService.updateProfile(this.loggedUser.id, payload).subscribe((res) => {
      this.updateProfileAPIResponse = res;
      console.log("createPackageAPIResponse ==> " + this.updateProfileAPIResponse);
      this.loggedUser.firstName = payload.firstName;
      this.loggedUser.lastName = payload.lastName;
      this.loggedUser.dateOfBirth = payload.dateOfBirth;
      localStorage.setItem("user", JSON.stringify(this.loggedUser))
    });
  }

}
