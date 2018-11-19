import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel, UserDetailModel } from '../models/joblist_model'
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
  _update_profile_url:string = this.base_url+"updateprofile"
  _get_profile_status:string = this.base_url+"profilestatus"
  _get_current_user:string = this.base_url+"currentuserdetail"

  constructor(private http: HttpClient, private router:Router) { }

  // Api Request

  loginApi(user):Observable<UserModel> {
    return this.http.post<UserModel>(this._login_url, user).pipe(catchError(this.errorHandler));
  }

  registerApi(user):Observable<UserModel> {
    return this.http.post<UserModel>(this._register_url, user).pipe(catchError(this.errorHandler));
  }

  updateProfileApi(userDetail):Observable<UserDetailModel> {
    return this.http.post<UserDetailModel>(this._update_profile_url, userDetail).pipe(catchError(this.errorHandler));
  }

  checkProfileUpdated() {
     return this.http.get(this._get_profile_status).pipe(catchError(this.errorHandler));
  }

  getCurrentUser() {
     return this.http.get(this._get_current_user).pipe(catchError(this.errorHandler));
  }

  // Utilities

  errorHandler(error : HttpErrorResponse) {
      console.log("Error handler")
      console.log(error.error.msg)
      return throwError(error.error.msg || "Server Error")
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

  getUsertype() {
      if (this.loggedIn()) {
          let isJobSeeker = (localStorage.getItem('usertype') === "jobseeker") ? false : true;
          return isJobSeeker;
      } else {
          return false;
      }

  }




}
