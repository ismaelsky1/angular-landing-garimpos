import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateSkillService {

  constructor(
    private http: HttpClient
  ) { }



  public show(id){       
    return this.http.get<any>(`${environment.api}/candidateskill/${id}`).pipe(map(response => {
       return response
    }))
  }

  public index(){
    let filter : any = {      
      "f_params[orderBy][field]": "created_at",
      "f_params[orderBy][type]": "DESC",      
      "page": "1",
      "items_per_page": "100"
    }    
    return this.http.get<any>(`${environment.api}/candidateskill`, {params: filter}).pipe(map(response => {
       return response
    }))
  }

  public create(data){     
    return this.http.post<any>(`${environment.api}/candidateskill`, data).pipe(map(response => {
       return response
    }))
  }

  public update(data){     
    return this.http.put<any>(`${environment.api}/candidateskill/${data.id}`, data).pipe(map(response => {
       return response
    }))
  }
  
  public destroy(id){     
    return this.http.delete<any>(`${environment.api}/candidateskill/${id}`).pipe(map(response => {
       return response
    }))
  }
}
