import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CboService {

  constructor(
    private http: HttpClient
  ) { }



  public show(cboId){       
    return this.http.get<any>(`${environment.api}/cbo/${cboId}`).pipe(map(response => {
       return response
    }))
  }

  public index(){
    let filter : any = {      
      "f_params[orderBy][field]": "cbo.created_at",
      "f_params[orderBy][type]": "DESC",      
      "page": "1",
      //"items_per_page": "20"
    }    
    return this.http.get<any>(`${environment.api}/cbo`, {params: filter}).pipe(map(response => {
       return response
    }))
  }
}
