import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApidataService } from '../services/apidata.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm = new FormGroup({
  //   email : new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', )
  // })

  public errorMsg;
  constructor(private _dataservice: ApidataService, private fb: FormBuilder, private router: Router) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  ngOnInit() {
    if (this._dataservice.loggedIn()) {
      this.router.navigate([''])
    }
  }

  onSubmit() {
    console.log(this.loginForm.value)
    this._dataservice.loginApi(this.loginForm.value)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token);
          localStorage.setItem('usertype', res.usertype);
          console.log("Token Updated")
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


        },
        err => {
        this.errorMsg = err
          this.loginForm.reset()
        }
      )
  }

  // loginUser() {
  //   this._dataservice.loginApi(this.loginUserData)
  //   .subscribe(
  //     res => console.log(res),
  //     err=> console.log(err)
  //   )
  // }

}
