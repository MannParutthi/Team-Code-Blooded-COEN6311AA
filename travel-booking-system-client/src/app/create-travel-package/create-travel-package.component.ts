import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CreateTravelPackageService } from './create-travel-package.service';

@Component({
  selector: 'app-create-travel-package',
  templateUrl: './create-travel-package.component.html',
  styleUrls: ['./create-travel-package.component.scss']
})
export class CreateTravelPackageComponent implements OnInit {
  formGroup: FormGroup = this.formBuilder.group({
    destinationCity: [null, []],
    destinationCountry: [null, []],
    noOfDays: [0, []],
    packageType: ['CUSTOM', []],
  });

  createPackageAPIResponse: any;

  constructor(private formBuilder: FormBuilder, private packageService: CreateTravelPackageService) { }

  ngOnInit(): void {
  }

  createPackage() {
    let payload = this.formGroup.getRawValue()
    console.log("createPackageFormGroup ==> " + JSON.stringify(payload));
    // payload.activitiesIncluded = payload.activitiesIncluded.split(',');
    this.packageService.createPackage(payload).subscribe((res) => {
      this.createPackageAPIResponse = res;
      console.log("createPackageAPIResponse ==> " + this.createPackageAPIResponse);
      this.getAllPackages();
    });
  }
}
