import { Injectable, ElementRef } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import * as d3 from "d3"

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataObservable: Observable<any>;
  constructor(private http:HttpClient) {}

  getData(data:any){
    this.dataObservable = this.http.get(
      data
    );
    return this.dataObservable;
  }

  createSvg(container:any){
    d3.select(container).select('svg').remove();
    const svg:any = d3
      .select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    const width:number = parseInt(svg.style('width'), 10);
    const height:number = parseInt(svg.style('height'), 10);
    return [svg,width,height]
  }

}
