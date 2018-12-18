import { Component, ViewChild } from '@angular/core';
import { Content, InfiniteScroll, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AddTransactionPage } from "../add-transaction/add-transaction";
import { SettingsPage } from "../settings/settings";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { StorageProvider } from "../../providers/storage/storage";
import { TransactionProvider } from '../../providers/transaction/transaction-service';
import { Vars } from '../../config/settings';
import { ModalController, ViewController } from 'ionic-angular';
import { ChooseDatePage } from '../choose-date/choose-date';

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
  public showEditButton = false;
  public showInfiniteScroll = false;
  public doughnutChart: any;
  public selectedCat = 'All';
  public balance: number = 0;
  public page = 1;
  public listOfCategories = Vars.categories;
  public listOfColors = Vars.catColors;
  public startDate = '';
  public finishDate ='';
  public showFilterCancel = false;
  public showInfo = false;
  public colorValues;
  public colors;

  constructor(public navCtrl: NavController,
              public auth: AuthServiceProvider,
              public storage: StorageProvider,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public transSrv: TransactionProvider) {
    // this.storage.user = JSON.parse(localStorage.getItem('user'));

    this.transSrv.getTransactionsByCategory({
      type: '',
      page: this.page,
      category: this.selectedCat,
      start: this.startDate,
      finish: this.finishDate
    }).subscribe((data) => {
            console.log(data);
            this.storage.user.transactions = data.transactions || [];
            this.storage.user.balance = data.user.balance;
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

    setTimeout(() => {
      this.page++;
      console.log(this.selectedCat, ' ', this.page);
      this.transSrv.getTransactionsByCategory({
        type: '',
        page: this.page,
        category: this.selectedCat,
        start: this.startDate,
        finish: this.finishDate
      })
        .subscribe((data) => {
            this.storage.user.transactions = this.storage.user.transactions.concat(data.transactions);
            console.log(data);
            if (data.transactions.length < 5) {
              this.showInfiniteScroll = true;
              this.infiniteScroll.enabled = false;
            } else {

            }
          },
          error => {
            console.log(error);
          });
      event.complete();
    }, 100);
  }

  addPurchase(transaction?) {
    transaction ? this.navCtrl.push(AddTransactionPage, {
      data: transaction
    }) : this.navCtrl.push(AddTransactionPage);
  }

  deletePurchase(transaction?) {
      let alert = this.alertCtrl.create({
        title: 'Delete transaction',
        message: 'Do you want delete this transaction?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

            }
          },
          {
            text: 'Submit',
            handler: () => {
              console.log(transaction);
              this.storage.user.transactions = this.storage.user.transactions.filter( (x) => x._id !== transaction._id);
              this.transSrv.deleteTransaction(transaction).subscribe( data => {
                this.storage.user.balance = data.balance;
                localStorage.setItem('user', JSON.stringify(this.storage.user));
              }, (err) => {
                console.warn(err);
              });
            }
          }
        ]
      });
      alert.present();
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

  cancelFilter() {
    this.showFilterCancel = false;
    this.page = 1;
    this.selectedCat = 'All';
    this.transSrv.getTransactionsByCategory({
      type: '',
      page: this.page,
      category: 'All'
    }).subscribe( (response) => {
      console.log(response);
      this.storage.user.transactions = response.transactions;
    }, error => {
      console.log(error);
    })
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(ChooseDatePage);
    profileModal.onDidDismiss(data => {
      if (data.status === 'submit') {
        this.showInfiniteScroll = false;
        this.infiniteScroll.enabled = true;
        this.showFilterCancel = data.category !== 'All';
        this.startDate = data.start;
        this.finishDate = data.finish;
        this.selectedCat = data.category;
        this.page = 1;

        this.transSrv.getTransactionsByCategory({
          start: data.start,
          type: '',
          page: this.page,
          finish: data.finish,
          category: data.category || 'All'
        }).subscribe( (response) => {
          this.storage.user.transactions = response.transactions;
        }, error => {
          console.log(error);
        })
      }
    });
    profileModal.present();
  }

  displayChart() {
    let categories = {
      'increase': 0,
      'food': 0,
      'household goods': 0,
      'services': 0,
      'others': 0,
      'coffee': 0
    };
    // todo chart with categories
    // this.storage.user.transactions.forEach(x => {
    //   categories[x.category] += x.cost;
    // });
    // console.log(categories);
    // // @ts-ignore
    // const colorValues = Object.values(categories);
    // // @ts-ignore
    // const colors = Object.values(Vars.catColors);
    // console.log(colorValues);
    // console.log(colors);

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
