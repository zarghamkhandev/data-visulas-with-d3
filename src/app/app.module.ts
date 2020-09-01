import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { Routes,RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WorldMapComponent } from './world-map/world-map.component';
import { HeirarchyTreeComponent } from './heirarchy-tree/heirarchy-tree.component';

const appRoutes:Routes = [
  {path: "", component: WorldMapComponent },
  {path: "barchart", component: BarChartComponent },
  {path: "worldmap", component: WorldMapComponent },
  {path: "heirarchytree", component: HeirarchyTreeComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    WorldMapComponent,
    HeirarchyTreeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
