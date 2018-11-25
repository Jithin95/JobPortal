import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, FormGroup } from '@angular/forms';
import { ApidataService } from '../services/apidata.service'
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';

const PasswordValidator: ValidatorFn = (fg: FormGroup) => {
  const password = fg.get('password').value;
  const cpassword = fg.get('cpassword').value;


  if (password !== cpassword) {
      return { 'misMatch': true };
  } else {
      return null;
  }
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public errorMsg;
    constructor(private spinner: NgxSpinnerService,private _dataservice: ApidataService, private fb: FormBuilder, private router: Router) { }

    registerForm = this.fb.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],
        usertype: ['employer']
        }, {validator : PasswordValidator}
    )

    onSubmit() {

        this.spinner.show();
        this._dataservice.registerApi(this.registerForm.value)
        .subscribe(
            res=> {
                setTimeout(() => {
                    this.spinner.hide();
                    this.router.navigate(['login'], {queryParams: {registersuccess: true}})
                }, 2000);
            },
            err=> {
                setTimeout(() => {
                    this.spinner.hide();
                    this.errorMsg = err
                    this.registerForm.reset()
                }, 2000);
            }
        )
    }

    ngOnInit() {
      this.spinner.show();
      setTimeout(() => {
          this.spinner.hide();
      }, 2000);
    }

}
