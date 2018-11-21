import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../../services/apidata.service'
import { JobListModel } from '../../models/joblist_model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  jobItems: any[];
  usertype = "";
  constructor(private _apidataservice: ApidataService, private router: Router) { }

  ngOnInit() {

     if (!this._apidataservice.getUsertype()) {
         this.usertype = "jobseeker"
     } else {
         this.usertype = "employer"
     }
     console.log("Usertype "+ this.usertype)
    this._apidataservice.getJobApi(this.usertype).subscribe((data) => {
        this.jobItems = JSON.parse(JSON.stringify(data)).jobs
              console.log("Job List "+ JSON.stringify(this.jobItems))
          });

  }
  
  clickedItem(id) {
        this.router.navigate(['job', id])
  }

}
