import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { Routes,RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WorldMapComponent } from './world-map/world-map.component';

const appRoutes:Routes = [
  {path: "", component: BarChartComponent },
  {path: "barchart", component: BarChartComponent },
  {path: "worldmap", component: WorldMapComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    WorldMapComponent
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
