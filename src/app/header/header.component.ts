import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../services/apidata.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isJobSeeker;
    username;
    current_url;
  constructor(public _dataservice: ApidataService, private router:Router) {
      this.isJobSeeker = _dataservice.getUsertype()

      router.events.subscribe((url:any) => {
          if (url.url) {
              this.current_url = url.url;
          }
          this.username = this._dataservice.getUsername()
      });
  }

  ngOnInit() {

  }

}
