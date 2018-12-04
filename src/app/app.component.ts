import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {MainPage} from "../pages/main/main";
import {StorageProvider} from "../providers/storage/storage";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';
import { NointernetPage } from '../pages/nointernet/nointernet';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: StorageProvider,
              network: Network
              // private screenOrientation: ScreenOrientation
  ) {
    // console.log(this.screenOrientation.type);
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    platform.ready().then(() => {

      statusBar.styleDefault();
      // @todo research a little bit more
      if (splashScreen) {
        setTimeout(() => {
          splashScreen.hide();
        }, 1000);
      }
      if (network.type == 'none') {
        this.rootPage = NointernetPage;
      } else {
        if (localStorage.getItem('x-access-token') !== null) {
          // @todo replace with one object
          storage.user = JSON.parse(localStorage.getItem('user'));
          this.rootPage = MainPage;
        } else {
          this.rootPage = LoginPage;
        }
      }

    });
  }
}

