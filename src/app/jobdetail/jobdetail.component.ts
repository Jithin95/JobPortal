import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApidataService } from '../services/apidata.service'

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})
export class JobdetailComponent implements OnInit {
  passId;
  jobData = null;
  usertype;
  appliedUser;
  isApplied;
  constructor(private _apidataservice: ApidataService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.passId = this.activeRoute.snapshot.paramMap.get('id');
    this._apidataservice.getJobDetailApi(this.passId).subscribe((data) => {
      this.jobData = data;
      console.log("Dat Get")
      console.log(this.jobData)

      if (!this._apidataservice.getUsertype()) {
          this.usertype = "jobseeker"
      } else {
          this.usertype = "employer"
      }

      if (this.jobData && this.usertype == "employer") {
          this.getAppliedJob(this.jobData.job._id)
      }

      if (this.jobData && this.usertype == "jobseeker") {
          this.checkAppliedStatus(this.usertype, this.jobData.job._id)
      }
    });
  }

  checkAppliedStatus(usertype, jobId) {
      this._apidataservice.getAppliedJobStatusApi(usertype, jobId)
      .subscribe((data)=>{
          console.log("Applied statis")
          console.log(data)
          if (JSON.parse(JSON.stringify(data)).status) {
              this.isApplied = true;
          } else {
              this.isApplied = false;
          }
      })
  }

  getUsertype() {
      return (this.usertype == "jobseeker")? true: false;
  }

  editJob(id) {
    console.log("Edit Button Clicked" + id)
    this.router.navigate(['job/update', id])
  }

  deleteMethod(jobId: string) {
    if (confirm("Are you sure to delete this job?")) {
      this._apidataservice.deleteJobApi(jobId)
        .subscribe(
          res => {
            this.router.navigate([''])
          },
          err => {
            console.log("Job Delete Error" + err)
          }
        )
    }
  }

  applyJob(jobId) {
      this._apidataservice.applyJobApi(this.usertype, jobId)
        .subscribe(
            data => {

                    this.checkAppliedStatus(this.usertype, this.jobData.job._id)
            },
            err => {
              console.log("Applied Job Error" + err)
            }
        )
  }

  getAppliedJob(jobId) {
      this._apidataservice.getAppliedJobApi(this.usertype, jobId)
        .subscribe(
            data => {
                console.log(data)
                this.appliedUser = JSON.parse(JSON.stringify(data)).appliedjobs[0].appliedUser
            },
            err => {
              console.log("Applied Job Error" + err)
            }
        )
  }

}
