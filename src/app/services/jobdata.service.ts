import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobdataService {

  get_jobpost_url:string = "http://localhost:3000/api/getjobs";
  constructor(private http: HttpClient) { }

  getJobPost() {
    console.log("List Job Service called")
    return this.http.get(this.get_jobpost_url)
  }
}
