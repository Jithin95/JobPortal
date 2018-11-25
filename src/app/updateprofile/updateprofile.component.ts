import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../services/apidata.service'
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private _dataservice: ApidataService, private fb: FormBuilder, private router: Router) { }

  isJobSeeker;
  errorMsg;
  profileForm = this.fb.group({
        mobile: ['', [Validators.required]],
        highest_qualification: ['', [Validators.required]],
        // resume: [''],
        c_name: ['', [Validators.required]],
        c_email: ['', [Validators.required]],
        c_designation: ['', [Validators.required]],
        c_address: ['', [Validators.required]],
        c_location: ['', [Validators.required]],
        c_description: ['', [Validators.required]],
      })

  ngOnInit() {
    this._dataservice.getCurrentUser()
      .subscribe((res) => {
        this.isJobSeeker = (JSON.parse(JSON.stringify(res)).usertype === "jobseeker") ? true : false;
        this.spinner.show();
        setTimeout(() => {
            this.spinner.hide();
        }, 2000);
      })
  }

  onSubmit() {
    this.spinner.show();
    this._dataservice.updateProfileApi(this.profileForm.value)
    .subscribe(
    res => {
    setTimeout(() => {
        this.spinner.hide();
        this.router.navigate(['']);
    }, 2000);
    },
    err => {
    setTimeout(() => {
        this.spinner.hide();
        this.errorMsg = err
    }, 2000);
    }
    )
  }
}
