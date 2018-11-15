import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../services/apidata.service'

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  constructor(private _dataservice: ApidataService) { }

  ngOnInit() {
      this._dataservice.checkProfileUpdated()
  }

}
