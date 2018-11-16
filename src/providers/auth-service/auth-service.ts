import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {StorageProvider} from "../storage/storage";
import { Settings } from '../../config/settings';

// @todo Serach for interceptors
// @todo Split on 2 services

@Injectable()
export class AuthServiceProvider {
  // @todo move to config file
  public MAIN_URL = Settings.MAIN_URL;

  constructor(public http: HttpClient, public storage: StorageProvider) {
  }

  public loginUser(email: string, password: string): Observable<any> {
    return this.http.post(this.MAIN_URL + 'auth/login', {
      'email': email,
      'password': password
    });
  }

  public registerUser(name: string, email: string, password: string): Observable<any> {
    console.log('service reg');
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

}
