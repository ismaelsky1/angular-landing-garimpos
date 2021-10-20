import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private http: HttpClient
  ) { }

  public getUser(userId){
    return this.http.get<any>(`${environment.api}/user/${userId}`).pipe(map(response => {
       return response
    }))
  }

  public verifiedEmail(userId){
    return this.http.get<any>(`${environment.api}/user/verifiedEmail/${userId}`).pipe(map(response => {
       return response
    }))
  }

  public alterPassword(id,data) {
    return this.http.put<any>(`${environment.api}/user/alterPassword/${id}`,data).pipe(map(response => {
      return response
    })) 
  }

  
}