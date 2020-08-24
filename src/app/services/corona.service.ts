import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class CoronaService {
  private dataObservable: Observable<any>;
  constructor(private http:HttpClient) {}

  getData(){
    this.dataObservable = this.http.get(
      "https://api.covid19api.com/summary"
    );
    return this.dataObservable;
  }

}
