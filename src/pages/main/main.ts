import {Component, Renderer, ViewChild} from '@angular/core';
import {
  App,
  Content,
  InfiniteScroll,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import {Chart} from 'chart.js';
import {AddTransactionPage} from "../add-transaction/add-transaction";
import {SettingsPage} from "../settings/settings";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {StorageProvider} from "../../providers/storage/storage";

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
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Content) content: Content;

  public token: string;
  public balance: number = 1000;
  public page = 1;
  private app: App = null;
  public showEditButton = false;
  public containerClass = 'transaction-container';
  public showInfiniteScroll = true;
  public items = [];

  doughnutChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalController: ModalController,
              public auth: AuthServiceProvider,
              public storage: StorageProvider) {

    this.auth.getTransactions('', 1)
      .subscribe((data) => {
          this.storage.transactions = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.displayChart();
    //
    // this.token = this.storageSrv.token;
    // this.balance = parseInt(localStorage.getItem('balance'), 10);
    // // this.balance = this.storageSrv.balance;
    //
    // // window.onscroll = function (e) {
    // //     console.log('fff');
    // // };
    // this.transService.getTransactions('', 1)
    //   .subscribe((data) => {
    //       this.transService.transactions = data;
    //       console.log(data);
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.auth.getTransactions('', this.page)
        .subscribe((data) => {
          data.splice(10,data.length-10);
            this.storage.transactions = this.storage.transactions.concat(data);
            console.log(data);
            if (data.length < 10) {
              // this.infiniteScroll.enabled = true;
              this.showInfiniteScroll = false;
              this.page--;
            }
          },
          error => {
            console.log(error);
          });
      console.log('Async operation has ended');
      event.complete();
    }, 1500);
  }

  addPurchase(transaction?) {
    console.log(transaction);
    transaction ? this.navCtrl.push(AddTransactionPage,{
      cost: transaction.cost,
      type: transaction.type,
      desc: transaction.description
    }) : this.navCtrl.push(AddTransactionPage);
  }

  showButton(x: HTMLElement) {
    console.log(x);
    // @ts-ignore
    document.querySelectorAll('.transaction-container').forEach(q => { if (q !== x) {q.className = 'transaction-container'; } });
    // x.className = (!~(x.className.indexOf('enable-edit'))) ? 'transaction-container enable-edit' : 'transaction-container' ;
    x.className = (!~(x.className.indexOf('enable-edit'))) ? 'transaction-container enable-edit' : 'transaction-container' ;
  }

  editPurchase(transaction) {
    this.navCtrl.push(AddTransactionPage,{
      id: "555",
      name: "Carl"
    });
  }

  goToSettings () {
    this.navCtrl.push(SettingsPage);
  }

  displayChart() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
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
        cutoutPercentage: 97,
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
