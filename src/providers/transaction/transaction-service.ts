import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from '../../config/settings';
import { StorageProvider } from '../storage/storage';
import { TransactionModel } from '../../models/transaction-model';
import { observable } from 'rxjs/symbol/observable';

@Injectable()
export class TransactionProvider {

  public MAIN_URL = Settings.MAIN_URL;

  constructor(public http: HttpClient, public storage: StorageProvider) {
  }

  public getTransactions(type: string, page?: number): Observable<any> {
    page = page || 1;
    return this.http.get(
      this.MAIN_URL + `transactions/?page=${page}`);
  }

  public getTransactionsByCategory(data): Observable<any> {
    const page = data.page || 1;
    const type = data.type || '';
    const category = data.category || '';
    const start = data.start || '';
    const finish = data.finish || '';
    if (start == '' && finish == ''){
      if (!!~category.indexOf('All')) {
        return this.http.get(
          this.MAIN_URL + `transactions/?page=${page}`);
      } else {
        return this.http.get(
          this.MAIN_URL + `transactions/?page=${page}&category=${category}`);
      }
    } else {
      if (category === 'All') {
        return this.http.get(
          this.MAIN_URL + `transactions/?page=${page}&start=${start}&finish=${finish}`);
      } else {
        return this.http.get(
          this.MAIN_URL + `transactions/?page=${page}&category=${category}&start=${start}&finish=${finish}`);
      }

    }

  }

  public addTransactions(tansaction): Observable<any> {
    return this.http.post(this.MAIN_URL + 'transactions', {
      'description': tansaction.description,
      'type': tansaction.type,
      'cost': tansaction.cost * 1,
      'category': tansaction.category
    });
  }

  public editTransactions(transaction): Observable<any> {
    return this.http.put(this.MAIN_URL + 'transactions', {
      _id: transaction._id,
      'description': transaction.description,
      'type': transaction.type,
      'cost': transaction.cost * 1,
      'category': transaction.category
    });
  }

  public deleteTransaction(transaction: TransactionModel): Observable<any> {
    return this.http.delete(`${Settings.MAIN_URL}transactions/${transaction._id}`, {});
  }
}
