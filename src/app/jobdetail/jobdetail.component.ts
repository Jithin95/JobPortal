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
  constructor(private _apidataservice: ApidataService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.passId = this.activeRoute.snapshot.paramMap.get('id');
    this._apidataservice.getJobDetailApi(this.passId).subscribe((data) => {
      this.jobData = data;
      console.log("Dat Get")
    });
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

}
