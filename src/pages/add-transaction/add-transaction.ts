import {Component, Input} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainPage} from "../main/main";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {StorageProvider} from "../../providers/storage/storage";

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

  // public transactionType = '';
  public transactionForm: FormGroup;
  public validation_messages;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalController: ModalController,
              public auth: AuthServiceProvider,
              public formBuilder: FormBuilder,
              public storageSrv: StorageProvider,
              // private route: ActivatedRoute,
  ) {
    this.transactionForm = this.formBuilder.group({
      transactionType: ['', Validators.required],
      cost: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9 ]*')
      ])],
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
    // @ts-ignore
    this.transactionForm.controls.cost.value = this.navParams.get('cost');
    // @ts-ignore
    this.transactionForm.controls.description.value = this.navParams.get('desc');
    // @ts-ignore
    this.transactionForm.controls.transactionType.value = this.navParams.get('type');
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

  getErrorMessage(name: string): any {
    const res = [];
    Object.keys(this[name].errors).forEach((error) => {
      res.push(this.validation_messages[name][error]);
    });
    return res[0];
  }

  submitPurchase() {
    this.auth.addTransactions(this.description.value || 'balance increase', this.transactionType.value, this.cost.value)
      .subscribe(value => {
          console.log(value);
          this.storageSrv.balance += this.transactionType.value === 'increase' ? value.cost : -value.cost;
          this.storageSrv.transactions.unshift(value);
        },
        error => {
          console.log(error);
        });
    this.navCtrl.pop();
  }

  cancel(): void {
    this.navCtrl.pop();
  }
}
