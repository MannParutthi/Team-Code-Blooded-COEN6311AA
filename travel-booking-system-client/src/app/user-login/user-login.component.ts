import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginService } from './user-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({
    'email': [null, Validators.required],
    'password': [null, Validators.required]
  });

  loggedUser: any;
  loginAPIResponse: any;

  constructor(private _router: Router, private formBuilder: FormBuilder, private userLoginService: UserLoginService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem("user")!=null) {
      this._router.navigateByUrl('/home')
    }
  }

  loginUser() {
    this.userLoginService.loginUser(this.formGroup.getRawValue()).subscribe((res) => {
      this.loggedUser = res;
      if (this.loggedUser == null)
      {
        this.loginAPIResponse = "Incorrect username or password"
        return
      }
      localStorage.setItem("user", JSON.stringify(res))
      this._router.navigateByUrl('/home')
    });
  }

}
