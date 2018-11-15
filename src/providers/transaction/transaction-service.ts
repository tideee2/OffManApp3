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

  public addTransactions(description: string, type: string, cost: number): Observable<any> {
    console.log('eqweqwe');
    return this.http.post(this.MAIN_URL + 'transactions', {'description': description, 'type': type, 'cost': cost * 1});
  }

  public deleteTransaction(transaction: TransactionModel): Observable<any> {
    console.log('deleting');
    return this.http.post(this.MAIN_URL + 'transactions', transaction);
  }
}
