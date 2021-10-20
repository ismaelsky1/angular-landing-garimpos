import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private http: HttpClient
  ) { }

  public index(filter = null,page = 1) {
    let params: string =
      "?f_params[orderBy][field]=job.created_at" +
      "&f_params[orderBy][type]=DESC" +
      "&_where[field]=job.active"+
      "&_where[value]=true" +
      "&items_per_page=10"+
      "&page="+page
    //"items_per_page": "20"

    if (filter) {
      if (filter.title) {        
        params += "&where_like[field]=title&where_like[type]=have&where_like[value]="+filter.title
        //&_where[field]=state_id&_where[value]="+filter.title
      }

      if (filter.city_id) {
        params += "&city_id[value]="+filter.city_id
      }

      if (filter.state_id && !filter.city_id) {
        params += ""+
        "&left_join[0][table]city"+
        "&left_join[0][on][0][field]=id"+
        "&left_join[0][on][0][field-condition]=city_id"+
        "&left_join[0][on][1][where]=state_id"+
        "&left_join[0][on][1][value]="+filter.state_id
        console.log(params)
        
      }

      if (filter.salary_id) {
        params += "&salary_id[value]="+filter.salary_id
      }

      if (filter.work_hour_id) {
        params += "&work_hour_id[value]="+filter.work_hour_id
      }
    }

    
    return this.http.get<any>(`${environment.api}/job${params}`).pipe(map(response => {
      return response
    }))
  }

  public show(idJob) {
    return this.http.get<any>(`${environment.api}/job/${idJob}`).pipe(map(response => {
      return response
    }))
  }


}