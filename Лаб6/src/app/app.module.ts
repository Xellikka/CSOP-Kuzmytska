import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UsersTableComponent } from './components/users-table/users-table';
import { FavoritesComponent } from './components/favorites/favorites';
import { GenderChartComponent } from './components/gender-chart/gender-chart';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js'; 
import { DoughnutController, ArcElement, Legend, Tooltip } from 'chart.js'; 
import { IonicStorageModule } from '@ionic/storage-angular';


Chart.register(DoughnutController, ArcElement, Legend, Tooltip); 
@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    FavoritesComponent,
    GenderChartComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgChartsModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }