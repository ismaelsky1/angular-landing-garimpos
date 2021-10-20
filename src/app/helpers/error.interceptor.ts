import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpClient,
  HttpUserEvent,
  HttpEventType, HttpEvent
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../services/authentication.service';

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  public sessionToken: any;

  constructor(
    private authenticationService: AuthenticationService,
    private injector: Injector
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.User>> {

    return next.handle(request).pipe(catchError(error => {

      // if (error.status === 401 && error.error.message === 'TOKEN_EXPIRED') {

      //   this.sessionToken = jwt_decode(this.authenticationService.getTokenValue())

      //   const http = this.injector.get(HttpClient);

      //   return http.post<any>(`${environment.api}/refreshToken`, {
      //     user_id: this.sessionToken.id
      //   }).pipe(switchMap(response => {

      //     localStorage.setItem('garimpos_token', response.data.token);
          
      //     const cloneRequest = request.clone({
      //       setHeaders: {Authorization: `Bearer ${response.data.token}`}
      //     });

      //     return next.handle(cloneRequest);
      //   }));
      // }
     
      if (error.status == 401 && error.error.message == "TOKEN_EXPIRED") {
       this.authenticationService.logout();
      }
    
      
      //const errorMessage = error.error.message || error.statusText;
      const errorMessage = error.error || error.statusText;
      return throwError(errorMessage);

    }));
  }

}