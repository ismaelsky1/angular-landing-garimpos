import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateRewardService {

  constructor(
    private http: HttpClient,
  ) { }

  public getcandidateReward(person_id){
    return this.http.get<any>(`${environment.api}/candidatereward/${person_id}`).pipe(map(response => {      
       return response
    }))
  }

  public getcandidateRewards(){
    return this.http.get<any>(`${environment.api}/candidatereward`).pipe(map(response => {      
       return response
    }))
  }

  public create(data){
    return this.http.post<any>(`${environment.api}/candidatereward`,data).pipe(map(response => {      
      return response
   }))

  }



}

