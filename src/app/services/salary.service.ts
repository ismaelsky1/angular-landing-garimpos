import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {


  constructor(
    private http: HttpClient
  ) { }

  public getSalarys(){
    return this.http.get<any>(`${environment.api}/salary`).pipe(map(response => {
       return response
    }))
  }
}
