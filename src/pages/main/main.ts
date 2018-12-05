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

  constructor(public navCtrl: NavController,
              public auth: AuthServiceProvider,
              public storage: StorageProvider,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public transSrv: TransactionProvider) {
    // this.storage.user = JSON.parse(localStorage.getItem('user'));

    this.transSrv.getTransactions('', 1)
      .subscribe((data) => {
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
    // @todo remove timeout
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
            // data.transactions.splice(10, data.length - 10);
            this.storage.user.transactions = this.storage.user.transactions.concat(data.transactions);
            console.log(data);
            if (data.transactions.length < 5) {

              this.showInfiniteScroll = true;
              this.infiniteScroll.enabled = false;
              // this.page--;
            } else {

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

  searchByCategory(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose category');
    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'All',
    //   value: 'All',
    //   checked: true
    // });
    this.listOfCategories.forEach( (x, i) => {
      alert.addInput({
        type: 'checkbox',
        label: x,
        value: x,
        checked: false
      });
    });
    // alert.addInput({
    //   type: 'checkbox',
    //   label: 'increase',
    //   value: 'increase',
    //   checked: false
    // });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        // this.transSrv.getTransactionsByCategory({
        //   category: data,
        //   type: '',
        //   page: 1
        // })
        //   .subscribe((data) => {
        //       console.log(data);
        //       this.storage.user.transactions = data.transactions || [];
        //       this.storage.user.balance = data.user.balance;
        //       this.selectedCat = data;
        //     },
        //     error => {
        //       console.log(error);
        //     });
      }
    });

    alert.present();
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
      console.log(data);
      if (data.status === 'submit') {
        this.showInfiniteScroll = false;
        this.infiniteScroll.enabled = true;
        this.showFilterCancel = data.category !== 'All';
        console.log(data.category);
        console.log(!!data.category);

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
          console.log(response);
          this.storage.user.transactions = response.transactions;
        }, error => {
          console.log(error);
        })
      }
    });
    profileModal.present();
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
