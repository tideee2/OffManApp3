import { Component, ViewChild } from '@angular/core';
import { Content, InfiniteScroll, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AddTransactionPage } from "../add-transaction/add-transaction";
import { SettingsPage } from "../settings/settings";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { StorageProvider } from "../../providers/storage/storage";
import { TransactionProvider } from '../../providers/transaction/transaction-service';

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
  public balance: number = 0;
  public page = 1;
  public showEditButton = false;
  public showInfiniteScroll = true;

  doughnutChart: any;

  constructor(public navCtrl: NavController,
              public auth: AuthServiceProvider,
              public storage: StorageProvider,
              public transSrv: TransactionProvider) {
    // this.storage.user = JSON.parse(localStorage.getItem('user'));

    this.transSrv.getTransactions('', 1)
      .subscribe((data) => {
          this.storage.user.transactions = data || [];
        },
        error => {
          console.log(error);
        });
  }

  ionViewDidLoad() {
    this.displayChart();
    console.log(this.storage.user.balance);
  }

  loadData(event) {
    // @todo remove timeout
    setTimeout(() => {
      this.page++;
      this.transSrv.getTransactions('', this.page)
        .subscribe((data) => {
            data.splice(10, data.length - 10);
            this.storage.user.transactions = this.storage.user.transactions.concat(data);
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
    }, 300);
  }

  addPurchase(transaction?) {
    transaction ? this.navCtrl.push(AddTransactionPage, {
      data: transaction
    }) : this.navCtrl.push(AddTransactionPage);
  }

  deletePurchase(transaction?) {
    console.log(transaction);
    this.storage.user.transactions = this.storage.user.transactions.filter( (x) => x._id !== transaction._id)
    this.transSrv.deleteTransaction(transaction);
  }

  showButton(x: HTMLElement) {
    // @ts-ignore
    document.querySelectorAll('.transaction-container').forEach(q => {
      if (q !== x) {
        q.className = 'transaction-container';
      }
    });
    x.className = (!~(x.className.indexOf('enable-edit'))) ? 'transaction-container enable-edit' : 'transaction-container';
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }

  displayChart() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.storage.user.balance, 300, 500, 400],
          backgroundColor: [
            '#1FB37F',
            '#CCCC33',
            '#000033',
            '#CC3333'
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
  }

}
