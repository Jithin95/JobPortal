import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { ApidataService } from './apidata.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {

  constructor(private injector: Injector) { }

  intercept(req, next) {
      let apiDataService = this.injector.get(ApidataService)
      let tokenizedRequest = req.clone({
          setHeaders: {
              Authorization: `Token ${apiDataService.getToken()}`
          }
      })

      return next.handle(tokenizedRequest)
  }
}
