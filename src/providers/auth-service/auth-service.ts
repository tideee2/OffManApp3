import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {StorageProvider} from "../storage/storage";

// @todo Serach for interceptors
// @todo Split on 2 services

@Injectable()
export class AuthServiceProvider {
  // @todo move to config file
  private MAIN_URL = 'http://5.101.180.10:3005/';

  constructor(public http: HttpClient, public storage: StorageProvider) {
  }

  public loginUser(email: string, password: string): Observable<any> {
    return this.http.post(this.MAIN_URL + 'auth/login', {
      'email': email,
      'password': password
    });
  }

  public registerUser(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.MAIN_URL + 'auth/registration', {
      'name': name,
      'email': email,
      'password': password
    });
  }

  public changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(this.MAIN_URL + 'user/password', {
      'confirm': oldPassword,
      'password': newPassword});
  }

  public changeUsername(newUsername: string): Observable<any> {
    return this.http.put(this.MAIN_URL + 'user/name/' + newUsername, {});
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.put(this.MAIN_URL + 'auth/change',
      {'email': email});
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

}
