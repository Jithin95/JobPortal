import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApidataService } from '../services/apidata.service';
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public errorMsg;
    public registersuccess;
    constructor(private spinner: NgxSpinnerService,private _dataservice: ApidataService, private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute) { }

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    })

    ngOnInit() {
        this.registersuccess = this.activeRoute.snapshot.queryParamMap.get('registersuccess')
        this.spinner.show();
        setTimeout(() => {
            this.spinner.hide();
        }, 2000);

        if (this._dataservice.loggedIn()) {
            this.router.navigate([''])
        }
    }

    onSubmit() {
        this.spinner.show();
        this._dataservice.loginApi(this.loginForm.value)
        .subscribe(
            res => {
                console.log(res)
                localStorage.setItem('token', res.token);
                localStorage.setItem('usertype', res.usertype);
                localStorage.setItem('username', res.username);
                // check if profile updated
                this._dataservice.checkProfileUpdated()
                .subscribe((res) => {
                    let jsonObj = JSON.parse(JSON.stringify(res))
                    if (jsonObj.is_profile_updated) {
                        this.router.navigate([''])
                    } else {
                        this.router.navigate(['updateprofile'])
                    }
                });
                setTimeout(() => {
                    this.spinner.hide();
                }, 2000);
            },
            err => {
                setTimeout(() => {
                    this.spinner.hide();
                    this.errorMsg = err
                    this.loginForm.reset()
                }, 2000);
            }
        )
    }
}
