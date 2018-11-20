import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApidataService } from '../services/apidata.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
  constructor(private _dataservice: ApidataService, private fb: FormBuilder, private router: Router) { }

    jobAddForm = this.fb.group({
      jobheading: [''],
      experience: [''],
      keyskills: [''],
      salarypackage: [''],
      jobDescription: [''],
    })

  ngOnInit() {
  }

  onSubmit() {
    this._dataservice.addJobApi(this.jobAddForm.value)
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
