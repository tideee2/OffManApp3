import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user-model';
import {Storage} from '@ionic/storage';

@Injectable()
export class StorageProvider {

  user: UserModel;
  _username: string;
  _balance: number;
  _transactions: any[];

  constructor(public storage: Storage) {
    console.log('Init StorageService');
    this.storage.ready().then(ok => {
      Promise.all([
        this.storage.get('username'),
        this.storage.get('balance'),
        this.storage.get('transactions')
      ]).then(results => {
        console.log(results);
        if (results[0]) {
          this._username = results[0];
          this._balance = results[1];
          this._transactions = results[2];
        } else {
          this._username = 'vasya';
          this._balance = 0;
          this._transactions = [];
          this.username = 'vasya';
          this.balance = 0;
          this.transactions = [];
        }
      });
    }).catch(err => console.log(err));
  }

  get username(): string {
    console.log('ff');
    return this._username;
  }

  set username(value: string) {
    console.log('set username');
    this.storage.set('username', value);
    this._username = value;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this.storage.set('balance', value);
    this._balance = value;
  }

  get transactions(): any[] {
    return this._transactions;
  }

  set transactions(value: any[]) {
    this.storage.set('transactions', value);
    this._transactions = value;
  }
}
