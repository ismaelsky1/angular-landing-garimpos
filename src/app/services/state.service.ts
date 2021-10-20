import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {


  constructor(
    private http: HttpClient
  ) { }

  public getStates(){
    return this.http.get<any>(`${environment.api}/state`).pipe(map(response => {
       return response
    }))
  }
}
