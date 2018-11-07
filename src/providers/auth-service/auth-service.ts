import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {StorageProvider} from "../storage/storage";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  private MAIN_URL = 'http://5.101.180.10:3005/';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(public http: HttpClient, public storage: StorageProvider) {
    console.log('Hello AuthServiceProvider Provider');
  }

  some () {
    console.log('qq');
  }

  public loginUser(email: string, password: string): Observable<any> {
    return this.http.post(this.MAIN_URL + 'auth/login', {
      'email': email,
      'password': password
    }, this.httpOptions);
  }

  public registerUser(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.MAIN_URL + 'auth/registration', {
      'name': name,
      'email': email,
      'password': password
    }, this.httpOptions);
  }

  public changePassword(oldPassword: string, newPassword: string, token?: string): Observable<any> {
    console.log(oldPassword);
    console.log(newPassword);
    token = token || this.storage.token;
    return this.http.put(this.MAIN_URL + 'user/password', {
      'confirm': oldPassword,
      'password': newPassword
    }, {headers: new HttpHeaders({'x-access-token': token})});
  }

  public changeUsername(newUsername: string, token: string): Observable<any> {
    return this.http.put(this.MAIN_URL + 'user/name/' + newUsername, {},
      {headers: new HttpHeaders({'x-access-token': token})});
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.put(this.MAIN_URL + 'auth/change',
      {'email': email},
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    );
  }

  getTransactions(type: string, page?: number): Observable<any> {
    // page = page || 1;
    return this.http.get(
      this.MAIN_URL + `transactions/?page=${page}`,
      { headers: new HttpHeaders({ 'x-access-token': this.storage.token || localStorage.getItem('x-access-token') })
      });
  }

  addTransactions(description: string, type: string, cost: number): Observable<any> {
    console.log(description, type, cost);
    console.log(this.MAIN_URL + 'transactions');
    console.log(this.storage.token);
    return this.http.post(this.MAIN_URL + 'transactions', {'description': description, 'type': type, 'cost': cost * 1},
      { headers: new HttpHeaders({ 'x-access-token': this.storage.token }) });
  }

}
