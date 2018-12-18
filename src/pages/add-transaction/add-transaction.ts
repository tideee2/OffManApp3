import { Component, Input } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MainPage } from "../main/main";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { StorageProvider } from "../../providers/storage/storage";
import { ErrorsProvider } from '../../providers/errors/errors';
import { Transaction, TransactionModel } from '../../models/transaction-model';
import { TransactionProvider } from '../../providers/transaction/transaction-service';
import { ShowMessageProvider } from '../../providers/show-message/show-message';
import { V } from '@angular/core/src/render3';
import { Vars } from '../../config/settings'
/**
 * Generated class for the AddTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-transaction',
  templateUrl: 'add-transaction.html',
})
export class AddTransactionPage {
  @Input() money: any;
  @Input() data: any;

  public transactionForm: FormGroup;
  public validation_messages;
  public transaction;

  listOfCategories = Vars.categories;
  listOfIncrease = Vars.incoming;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public auth: AuthServiceProvider,
              public formBuilder: FormBuilder,
              public errorSrv: ErrorsProvider,
              public msgSrv: ShowMessageProvider,
              public transSrv: TransactionProvider,
              public storageSrv: StorageProvider) {

    this.transactionForm = this.formBuilder.group({
      transactionType: ['', Validators.required],
      cost: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(\\d*\\.)?\\d+$')
      ])],
      category: ['', Validators.required],
      description: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(5)
        ])]
    });

    this.validation_messages = {
      'cost': {
        required: 'Enter cost of purchase',
        pattern: 'Cost must consist only of numbers'
      },
      'description': {
        required: 'Description is required',
        minlength: 'Description must be at least 5 characters long',
        maxlength: 'Description cannot be more than 20 characters long'
      },
    };

    // @todo create Transaction model and use it here


    this.transaction = this.navParams.get('data') || new Transaction();
    // @ts-ignore
    this.transactionForm.controls.cost.value = this.transaction.cost;
    // @ts-ignore
    this.transactionForm.controls.description.value = this.transaction.description;
    // @ts-ignore
    this.transactionForm.controls.transactionType.value = this.transaction.type || 'decrease';
    // @ts-ignore
    this.transactionForm.controls.category.value = this.transaction.category || 'others';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTransactionPage');

  }

  get cost() {
    return this.transactionForm.get('cost');
  }

  get transactionType() {
    return this.transactionForm.get('transactionType');
  }

  set transactionType(val) {
    this.transactionForm.value.transactionType = val;
  }

  get description() {
    return this.transactionForm.get('description');
  }

  set cost(val) {
    this.transactionForm.value.cost = val;
  }

  set description(val) {
    this.transactionForm.value.description = val;
  }

  get category() {
    return this.transactionForm.get('category');
  }

  set category(val) {
    this.transactionForm.value.category = val;
  }

  submitPurchase() {
    console.log(this.transactionForm);
    if (this.transaction._id) {
      this.editTransaction();
    } else {
      this.addTrans();
    }
    this.navCtrl.pop();
  }

  addTrans(){
    const sendTransaction = {
      description: this.description.value || 'balance increase',
      type: this.transactionType.value,
      cost: this.cost.value,
      category: this.category.value
    };
    console.log(sendTransaction);
    this.transSrv.addTransactions(sendTransaction)
      .subscribe(value => {
        console.log('-----');
        console.log(value);
          this.msgSrv.presentAlert('Message', 'transaction add successful')
          console.log(this.storageSrv);
          this.storageSrv.user.balance = value.user.balance + (sendTransaction.type === 'increase' ? 1 : -1) *
            sendTransaction.cost;
          this.storageSrv.user.transactions.unshift(value.transaction.q);
          localStorage.setItem('user', JSON.stringify(this.storageSrv.user));

        },
        error => {
          console.log(error);
          this.msgSrv.presentAlert('Error', error.error)
        });
  }

  editTransaction() {
    const sendTransaction = {
      _id: this.transaction._id,
      description: this.description.value || 'balance increase',
      type: this.transactionType.value,
      cost: this.cost.value,
      category: this.category.value
    };
    this.transSrv.editTransactions(sendTransaction)
      .subscribe(value => {
          this.msgSrv.presentAlert('Message', 'transaction edit successful');
          console.log(this.storageSrv);
          this.storageSrv.user.balance = value.user.balance + (sendTransaction.type === 'increase' ? 1 : -1) *
            Math.abs(sendTransaction.cost - this.cost.value);
          this.storageSrv.user.transactions.filter((x) => {
            return value.transaction.q._id !== x._id;
          })
          localStorage.setItem('user', JSON.stringify(this.storageSrv.user));

        },
        error => {
          console.log(error);
          this.msgSrv.presentAlert('Error', error.error)
        });
  }

  cancel(): void {
    this.navCtrl.pop();
  }
}
