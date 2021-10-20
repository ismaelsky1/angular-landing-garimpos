import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(
    private http: HttpClient
  ) { }

  public getRewards(page){
    return this.http.get<any>(`${environment.api}/reward?page=${page}&items_per_page=5`).pipe(map(response => {
       return response
    }))
  }
}
