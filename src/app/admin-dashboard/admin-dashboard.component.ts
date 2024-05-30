import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var Chart: any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Series A',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Series B',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
    let myChart: any;

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {}
    });

  }
}
