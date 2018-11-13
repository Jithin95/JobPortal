import { Component, OnInit } from '@angular/core';
import { JobdataService } from '../../services/jobdata.service';
import { JobListModel } from '../../models/joblist_model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  jobItems: JobListModel[];
  constructor(private _jobdataservice: JobdataService ) { }

  ngOnInit() {

    this._jobdataservice.getJobPost().subscribe((data) => {
              console.log("Job List "+ data)
              this.jobItems = JSON.parse(JSON.stringify(data));
          });

  }

}
