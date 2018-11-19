import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../services/apidata.service'
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  constructor(private _dataservice: ApidataService, private fb: FormBuilder, private router: Router) { }

  isJobSeeker;
  errorMsg;
  profileForm = this.fb.group({
        mobile: [''],
        highest_qualification: [''],
        // resume: [''],
        c_name: [''],
        c_email: [''],
        c_designation: [''],
        c_address: [''],
        c_description: [''],
      })

  ngOnInit() {
    this._dataservice.getCurrentUser()
      .subscribe((res) => {
        this.isJobSeeker = (JSON.parse(JSON.stringify(res)).usertype === "jobseeker") ? true : false;
      })
  }

  onSubmit() {
      console.log("On submit called")
    this._dataservice.updateProfileApi(this.profileForm.value)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['']);
        },
        err => {
          this.errorMsg = err
        }
      )
  }

  selectedFile = null
  onFileSelected(event) {
      this.selectedFile = event.target.files[0];
  }

  uploadFile() {
       }

}
