import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../services/apidata.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _dataservice: ApidataService) { }

  ngOnInit() {
  }

}
