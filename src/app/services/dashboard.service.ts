import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
  ) { }

  public create(data) {
    let params: string = `name=${data.name}`+
    `&email=${data.email}`+
    `&cellphone=${data.cellphone}`+
    `&text=${data.text}`
   
    return this.http.get<any>(`${environment.api}/contact?${params}`).pipe(map(response => {
      return response
    }))
  }

  public cardNumbers() {   
    return this.http.get<any>(`${environment.api}/dashboard/card-numbers`).pipe(map(response => {
      return response
    }))
  }

}
