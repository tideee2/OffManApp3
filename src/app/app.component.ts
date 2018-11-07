import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {MainPage} from "../pages/main/main";
import {ChangePage} from "../pages/change/change";
import {StorageProvider} from "../providers/storage/storage";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  rootPage:any;
  // rootPage:any = MainPage;
  // rootPage: any = ChangePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: StorageProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log(localStorage.getItem('x-access-token'));
      if (localStorage.getItem('x-access-token') !== null) {
        storage.token = localStorage.getItem('x-access-token');
        storage.name = localStorage.getItem('name');
        storage.email = localStorage.getItem('email');
        // storage.transactions = localStorage.getItem('transactions');
        storage.balance = parseInt(localStorage.getItem('balance'));
        storage.userId = localStorage.getItem('id');
        this.rootPage = MainPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
}

