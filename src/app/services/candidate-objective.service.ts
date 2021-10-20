import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateObjectiveService {

  constructor(
    private http: HttpClient
  ) { }



  public show(cboId){       
    return this.http.get<any>(`${environment.api}/candidateobjective/${cboId}`).pipe(map(response => {
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
    return this.http.get<any>(`${environment.api}/candidateobjective`, {params: filter}).pipe(map(response => {
       return response
    }))
  }

  public create(data){     
    return this.http.post<any>(`${environment.api}/candidateobjective`, data).pipe(map(response => {
       return response
    }))
  }
  
  public destroy(candidateObjectiveId){     
    return this.http.delete<any>(`${environment.api}/candidateobjective/${candidateObjectiveId}`).pipe(map(response => {
       return response
    }))
  }
  
}
