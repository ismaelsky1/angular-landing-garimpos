import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(
    private http: HttpClient
  ) { }

  public getCandidate(){
    return this.http.get<any>(`${environment.api}/company`).pipe(map(response => {
       return response
    }))
  }
}
