import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';
import { ApidataService } from '../services/apidata.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-jobupdate',
  templateUrl: './jobupdate.component.html',
  styleUrls: ['./jobupdate.component.css']
})
export class JobupdateComponent implements OnInit {
  jobId;
  jobData;
  constructor(private spinner: NgxSpinnerService, private _apidataservice: ApidataService, private fb: FormBuilder, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.jobId = this.activeRoute.snapshot.paramMap.get('id');
    this._apidataservice.getJobDetailApi(this.jobId).subscribe((data) => {
      this.jobData = JSON.parse(JSON.stringify(data)).job;
    });
  }

  jobUpdateForm = this.fb.group({
    jobheading: ['', [Validators.required]],
    experience: ['', [Validators.required]],
    keyskills: ['', [Validators.required]],
    salarypackage: ['', [Validators.required]],
    jobDescription: ['', [Validators.required]],
  })

  onSubmit() {
    this.spinner.show();
    this._apidataservice.updateJobDetailApi(this.jobUpdateForm.value, this.jobId)
      .subscribe(
        res => {
          setTimeout(() => {
            this.router.navigate(['']);
            this.spinner.hide();
          }, 2000);
        },
        err => {
          setTimeout(() => {

            console.log("Error in add Job " + err)
          }, 2000);
        }
      )
  }

}
