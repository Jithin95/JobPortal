import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, FormGroup } from '@angular/forms';
import { ApidataService } from '../services/apidata.service'
import { Router } from "@angular/router";
// import { PasswordValidator} from '../shared/passwordValidator';

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
  constructor(private _dataservice: ApidataService, private fb: FormBuilder, private router: Router) { }

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    cpassword: ['', [Validators.required]],
    usertype: ['employer']
}, {validator : PasswordValidator})

  onSubmit() {
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
