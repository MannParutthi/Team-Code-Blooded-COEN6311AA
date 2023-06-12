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
    'email': [null, Validators.required],
    'password': [null, Validators.required]
  });

  loggedUser: any;

  constructor(private _router: Router, private formBuilder: FormBuilder, private userLoginService: UserLoginService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem("user")!=null) {
      this._router.navigateByUrl('/home')
    }
  }

  loginUser() {
    this.userLoginService.loginUser(this.formGroup.getRawValue()).subscribe(
      (res) => {
      this.loggedUser = res;
      localStorage.setItem("user", JSON.stringify(res))
      this.toastr.success('Login Successful', 'Welcome');
      this._router.navigateByUrl('/home')
    },
    (error) => {
      this.toastr.error('Incorrect username or password', 'Login Failed');
    }
    );
  }

}
