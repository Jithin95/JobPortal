import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApidataService } from '../services/apidata.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public errorMsg;
  constructor(private _dataservice: ApidataService, private fb: FormBuilder, private router: Router) { }

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    cpassword: ['', [Validators.required]]
  })

  onSubmit() {

    console.log(this.registerForm.value)
    this._dataservice.registerApi(this.registerForm.value)
    .subscribe(
        res=> {console.log(res)
            localStorage.setItem('token', res.token);
            this.router.navigate(['login'])
        },
        err=> { this.errorMsg = err
            this.registerForm.reset()
        }
    )
  }

  ngOnInit() {
  }

}
