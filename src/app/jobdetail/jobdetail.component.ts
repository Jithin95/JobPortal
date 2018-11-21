import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApidataService } from '../services/apidata.service'

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})
export class JobdetailComponent implements OnInit {
passId;
jobData;
  constructor(private _apidataservice: ApidataService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
      this.passId = this.activeRoute.snapshot.paramMap.get('id');
      this._apidataservice.getJobDetailApi(this.passId).subscribe((data) => {
          this.jobData= data;
          console.log("Data Get")
          console.log(JSON.stringify(this.jobData))
        });
  }

}
