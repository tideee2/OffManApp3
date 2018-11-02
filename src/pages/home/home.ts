import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  Chart
} from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  greens: number;
  reds: number;
  yellows: number = 5;
  doughnutChart: any;
  constructor(public navCtrl: NavController) {
    this.greens = 0;
    this.reds = 0;
  }

  ionViewDidLoad(){
    this.displayChart();

  }

  addGreens(): void {
    this.greens++;
    this.displayChart();
  }

  addReds(): void {
    this.reds++;
    this.displayChart();
  }

  displayChart() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      radius: "90%",
      data: {
        datasets: [{
          data: [this.greens, this.reds, this.yellows],
          backgroundColor: [
            'rgba(0, 255, 0, 1)',
            'rgba(255, 0, 0, 1)',
            '#1FB37F'
          ],
        }]
      },
      options: {
        cutoutPercentage: 95,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: false,
          fontStyle: 'bold',
          fontSize: 14
        }
      }
    });
    console.log(this.doughnutChart);
    // this.doughnutChart.innerRadius = 100;
    // this.doughnutChart.outerRadius = 120;
    // this.doughnutChart.radiusLength = 20;
    this.doughnutChart.chart.outerRadius = 5000;
    this.doughnutChart.options.elements.point.radius = '50px';
  }

}
