import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  public subscription(idCandidat,idJob){
    return this.http.post<any>(`${environment.api}/subscription`, {candidate_id: idCandidat,job_id: idJob,status: 'PENDENT'}).pipe(map(response => {
       return response
    }))
  }
  public index(){
    return this.http.get<any>(`${environment.api}/subscription`).pipe(map(response => {
       return response
    }))
  }
  public getSubscriptions(candidate_id){
    let params = {
      // "_where[field]": "candidate_id",
      // "_where[operator]":"=",
      // "_where[value]":candidate_id,
      "_where[field]": "status",
      "_where[operator]":"!=",
      "_where[value]":"GIVE_UP",
      // "where_not_null":"status",
      //"where_null":"status"
    }
    //&_where[field]=status&_where[operator]=!=&_where[value]=GIVE_UP
    return this.http.get<any>(`${environment.api}/subscription?_where[field]=candidate_id&_where[operator]==&_where[value]=${candidate_id}&_where[field]=status&_where[operator]=!=&_where[value]=GIVE_UP`).pipe(map(response => {
    //return this.http.get<any>(`${environment.api}/subscription/a25eb624-1643-42cf-9f1f-70ab0ae1802b`).pipe(map(response => {
       return response
    }))
  }
  public setSubscription(subscriptionId,status){
    return this.http.put<any>(`${environment.api}/subscription/${subscriptionId}`,status).pipe(map(response => {
       return response
    }))
  }
}
