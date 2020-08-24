import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Observable} from 'rxjs';
import { BarChartData } from '../../models/barchartdata.model';
import * as d3 from 'd3';
import { DataService } from '../services/data.service';
import {Margin} from "../../models/margin.model"

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getData('../assets/barchartdata.json').subscribe((res) => {
      this.data = res;
      this.createChart();
    });
  }
  @HostListener('window:resize') doSomething() {
    this.createChart();
  }
  @ViewChild('barChartContainer', { static: true })
  barChartContainer: ElementRef;
  data: BarChartData[];
  createChart() {
    const data = this.data;
    const [svg,width,height] = this.dataService.createSvg(this.barChartContainer.nativeElement);
    const render = () => {
      const xValue = (d) => d.population;
      const yValue = (d) => d.country;
      const margin = { top: 10, right: 10, bottom: 30, left: 100 };
      
      const innerWidth= width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth]);

      const yScale = d3
        .scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.2);

      const XAxisTickFormat = (number) =>
        d3.format('.3s')(number).replace('G', 'B');

      const yAxis = d3.axisLeft(yScale);
      const xAxis = d3.axisBottom(xScale).tickFormat(XAxisTickFormat);
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xAxisGroup = g.append('g');
      const yAxisGroup = g.append('g');
      yAxisGroup.call(yAxis).selectAll('.domain, .tick line ').remove();
      xAxisGroup.call(xAxis).attr('transform', `translate(0,${innerHeight})`);

      yAxisGroup.selectAll('.tick text').attr('font-size', '14px');
      xAxisGroup.selectAll('.tick text').attr('font-size', '14px');

      g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', (d: BarChartData) => yScale(yValue(d)))
        .attr('width', (d: BarChartData) => xScale(d.population))
        .attr('height', yScale.bandwidth())
        .attr('fill', 'var(--teal)');
    };

    render();
  }
}
