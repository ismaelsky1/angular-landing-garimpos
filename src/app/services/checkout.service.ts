import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private http: HttpClient
  ) { }

  public new(data){
    return this.http.post<any>(`${environment.api}/checkout/charges`,data).pipe(map(response => {
       return response
    }))
  }

}

