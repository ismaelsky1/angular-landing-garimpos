import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkhourService {


  constructor(
    private http: HttpClient
  ) { }

  public getWorkHours(){
    return this.http.get<any>(`${environment.api}/workhour`).pipe(map(response => {
       return response
    }))
  }
}
