import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadidateService {

  constructor(
    private http: HttpClient,
  ) { }

  public registerCandidate(dataCadidate){
    return this.http.post<any>(`${environment.api}/candidate`, dataCadidate).pipe(map(response => {
       return response
    }))
  }
  public getCandidate(person_id){
    return this.http.get<any>(`${environment.api}/candidate/${person_id}`).pipe(map(response => {
       return response
    }))
  }
  public setCandidate(CandidateId,data){
    return this.http.put<any>(`${environment.api}/candidate/${CandidateId}`, data).pipe(map(response => {
       return response
    }))
  }


}
