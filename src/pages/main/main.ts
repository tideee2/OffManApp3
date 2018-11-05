import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'chart.js';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;

  balance: number = 1000;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.displayChart();
  }

  displayChart() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      width: 400,
      height: 200,
      data: {
        datasets: [{
          data: [this.balance],
          backgroundColor: [
            '#1FB37F'
          ],
          borderWidth: 0
        }]
      },
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        cutoutPercentage: 95,
        radius: 5,
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
  }

}