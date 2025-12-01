import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-gender-chart',
  standalone: false,
  imports: [NgChartsModule],
  template: `<div style="max-width:400px">
    <canvas baseChart
            [data]="chartData"
            [type]="'doughnut'"
            [options]="chartOptions">
    </canvas>
  </div>`
})

export class GenderChartComponent implements OnChanges {

  @Input() users: User[] = []; 

  chartData: ChartData<'doughnut'> = {
    labels: ['male','female','other'],
    datasets: [{ data: [0,0,0] }]
  };

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  ngOnChanges(changes: SimpleChanges) {
    this.updateChart();
  }

  updateChart() {
    const counts = { male: 0, female: 0, other: 0 };
    (this.users || []).forEach(u => {   //  якщо null
      const g = (u.gender || 'other').toLowerCase();
      if (g === 'male') counts.male++;
      else if (g === 'female') counts.female++;
      else counts.other++;
    });
    this.chartData = {
      labels: ['male','female','other'],
      datasets: [{ data: [counts.male, counts.female, counts.other] }]
    };
  }
}
