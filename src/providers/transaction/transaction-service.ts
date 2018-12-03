import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from '../../config/settings';
import { StorageProvider } from '../storage/storage';
import { TransactionModel } from '../../models/transaction-model';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
    if (category === 'All') {
      return this.http.get(
        this.MAIN_URL + `transactions/?page=1`);
    } else {
      return this.http.get(
        this.MAIN_URL + `transactions/?page=${page}&category=${category}`);
    }
  }

  public addTransactions(tansaction): Observable<any> {
    console.log('eqweqwe');
    return this.http.post(this.MAIN_URL + 'transactions', {
      'description': tansaction.description,
      'type': tansaction.type,
      'cost': tansaction.cost * 1,
      'category': tansaction.category
    });
  }

  public editTransactions(transaction): Observable<any> {
    console.log('eqweqwe');
    return this.http.put(this.MAIN_URL + 'transactions', {
      _id: transaction._id,
      'description': transaction.description,
      'type': transaction.type,
      'cost': transaction.cost * 1,
      'category': transaction.category
    });
  }

  public deleteTransaction(transaction: TransactionModel): Observable<any> {
    console.log('deleting');

    // return this.http.delete(this.MAIN_URL + 'transactions', {'body': transaction});
    return this.http.delete('http://localhost:3000/transactions', {});
  }
}
