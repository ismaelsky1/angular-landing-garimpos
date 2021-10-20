import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentToken: Observable<string>

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getTokenValue(): string {
    return sessionStorage.getItem('garimpos_token')
  }

  public setCurrentToken(token: string) {
    sessionStorage.setItem('garimpos_token', token)
  }

  public login(dataLogin) {
    return this.http.post<any>(`${environment.api}/login`, dataLogin).pipe(map(response => {
      this.setCurrentToken(response.accessToken)
      return response
    }))
  }

  public logout() {
    sessionStorage.removeItem('garimpos_token')
    this.router.navigate(['/'])
  }

  public forgotPassword(email) {
    return this.http.get<any>(`${environment.api}/forgotPassword/${email}`).pipe(map(response => {
      return response
    }))
  }


  public recoverPassword(data) {
    return this.http.post<any>(`${environment.api}/forgotpassword`,data).pipe(map(response => {
      return response
    }))
  }

  public sendMailVerification(email) {
    let param : any = {email: email}
    return this.http.get<any>(`${environment.api}/sendMailVerification`,{params : param} ).pipe(map(response => {
      return response
    }))
  }

  

}
