import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../models/joblist_model'
import { Observable, throwError } from "rxjs";
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApidataService {
  base_url: string = "http://localhost:3000/api/users/";
  _login_url:string = this.base_url+"login"
  _register_url:string = this.base_url+"register"

  constructor(private http: HttpClient, private router:Router) { }

  loginApi(user):Observable<UserModel> {
    return this.http.post<UserModel>(this._login_url, user).pipe(catchError(this.errorHandler));
  }

  registerApi(user):Observable<UserModel> {
    return this.http.post<UserModel>(this._register_url, user).pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse) {
      console.log("Error handler")
      console.log(error.error.msg)
      return throwError(error.error.msg || "Server Error")
  }

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')
  setLoggedStatus(value:boolean) {
      this.loggedInStatus = value
      localStorage.setItem('loggedIn', 'true')
  }

  get isLoggedIn() {
      return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus)
  }

  loggedIn() {
      return !!localStorage.getItem('token')
  }

  getToken() {
      return localStorage.getItem('token')
  }

  logoutUser() {
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
  }
}
