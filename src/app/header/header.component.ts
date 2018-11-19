import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../services/apidata.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isJobSeeker;
  constructor(private _dataservice: ApidataService) {
      this.isJobSeeker = _dataservice.getUsertype()
      console.log("Job Seeker type "+this.isJobSeeker)
  }

  ngOnInit() {
  }

}
