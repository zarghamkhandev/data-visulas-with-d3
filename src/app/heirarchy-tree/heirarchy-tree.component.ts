import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import * as d3 from "d3";
@Component({
  selector: 'app-heirarchy-tree',
  templateUrl: './heirarchy-tree.component.html',
  styleUrls: ['./heirarchy-tree.component.css']
})
export class HeirarchyTreeComponent implements OnInit {
  constructor(private DataService: DataService) { }
  ngOnInit(): void {
    this.DataService.getData("../../assets/countryHeirarchy.json").subscribe(res=>{
      this.data = res;
      this.createChart();
    })
  }
  data:any;
  @ViewChild("heirarchyTree",{static:true}) HeirarchyTreeContainer:ElementRef;
  createChart(){
    const container = this.HeirarchyTreeContainer.nativeElement;
    const [svg,width,height] = this.DataService.createSvg(container)
    const treeLayout = d3.tree().size([height,width]);
    const root = d3.hierarchy(this.data);
    treeLayout(root);
  }
}
