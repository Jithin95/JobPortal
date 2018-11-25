import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApidataService } from '../services/apidata.service'
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService, private _dataservice: ApidataService, private fb: FormBuilder, private router: Router) { }

    jobAddForm = this.fb.group({
      jobheading: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      keyskills: ['', [Validators.required]],
      salarypackage: ['', [Validators.required]],
      jobDescription: ['', [Validators.required]],
    })

  ngOnInit() {
  }

  onSubmit() {
      this.spinner.show();
    this._dataservice.addJobApi(this.jobAddForm.value)
      .subscribe(
        res => {
            setTimeout(() => {
                this.router.navigate(['']);
                this.spinner.hide();
            }, 2000);
        },
        err => {
            setTimeout(() => {
                console.log("Error in add Job "+err)
            this.spinner.hide();
        }, 2000);
        }
      )
  }

}
