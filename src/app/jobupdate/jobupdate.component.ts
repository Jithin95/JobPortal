import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';
import { ApidataService } from '../services/apidata.service'

@Component({
  selector: 'app-jobupdate',
  templateUrl: './jobupdate.component.html',
  styleUrls: ['./jobupdate.component.css']
})
export class JobupdateComponent implements OnInit {
    jobId;
    jobData;
  constructor(private _apidataservice: ApidataService, private fb: FormBuilder, private activeRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit() {

      this.jobId = this.activeRoute.snapshot.paramMap.get('id');
      this._apidataservice.getJobDetailApi(this.jobId).subscribe((data) => {
          this.jobData= data;
        });
  }


      jobUpdateForm = this.fb.group({
        jobheading: [this.jobData.job.jobheading],
        experience: [this.jobData.job.experience],
        keyskills: [this.jobData.job.keyskills],
        salarypackage: [this.jobData.job.salarypackage],
        jobDescription: [this.jobData.job.jobDescription],
      })

      onSubmit() {
        this._apidataservice.updateJobDetailApi(this.jobUpdateForm.value)
          .subscribe(
            res => {
              this.router.navigate(['']);
            },
            err => {
            console.log("Error in add Job "+err)
            }
          )
      }

}
