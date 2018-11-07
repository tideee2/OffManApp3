import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  public balance: number;
  public email: string;
  public token: string;
  public userId: string;
  public name: string;
  public transactions: Array<any>;

  constructor(public http: HttpClient) {
    console.log('Hello StorageProvider Provider');
  }

}
