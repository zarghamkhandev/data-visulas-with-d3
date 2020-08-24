import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { CoronaService } from '../services/corona.service';
import { feature } from 'topojson-client';
import * as d3 from 'd3';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css'],
})
export class WorldMapComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private CoronaService: CoronaService
  ) {}
  ngOnInit(): void {
    this.dataService
      .getData('../../assets/worldmapdata.json')
      .subscribe((res) => {
        const tempdata = feature(res, res.objects.countries);
        tempdata.features.map((item) => {
          if (!item.id) {
            item.id = `${Math.floor(Math.random() * 800)}`;
          }
        });
        this.topoData = tempdata;
        this.CoronaService.getData().subscribe((res) => {
          const obj = {};
          const cases = [];
          res.Countries.map((item) => {
            obj[item['Country']] = item['TotalConfirmed'];
          
            cases.push(item['TotalConfirmed'])
          });
          const linearScale = d3.scaleLog().domain([d3.min(cases),d3.max(cases)]).range([0,100])
          this.topoData.features.map((item) => {
            
            item.properties['TotalCases'] = obj[item.properties.name]?obj[item.properties.name]:50 ;
            item.properties['ScaledValue'] = linearScale(item.properties['TotalCases']);
          });
          this.createChart();
        });
      });
  }
  topoData: any;
  coronaData: any;
  @ViewChild('worldMapContainer', { static: true })
  worldMapContainer: ElementRef;

  createChart() {
    const data = this.topoData;
    console.log(data)

    const pathGenerator = d3.geoPath().projection(d3.geoMercator());
    const container = this.worldMapContainer.nativeElement;
    const [svg, width, height] = this.dataService.createSvg(container);
    const colorScale = d3
      .scaleThreshold<number,string>()
      .domain([10, 20, 30, 40, 50,60,70,80,90,100])
      .range(
        ["#fff5f0","#fee3d6","#fdc9b4","#fcaa8e","#fc8a6b","#f9694c","#ef4533","#d92723","#bb151a","#970b13","#67000d"]
      );
    svg.attr('viewBox', '0 0 961 500');
    const paths = svg.selectAll('path').data(data.features);
    paths
      .enter()
      .append('path')
      .attr("class","svg-country")
      .attr('d', (d) => pathGenerator(d))
      .attr('fill', (d) => colorScale(d.properties.ScaledValue))
      .append("title")
      .text(d=>(`${d.properties.name} | Total Cases: ${d.properties.TotalCases}`));
  }
}
