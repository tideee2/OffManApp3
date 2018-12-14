import { Component } from '@angular/core';
import { Events, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {MainPage} from "../pages/main/main";
import {StorageProvider} from "../providers/storage/storage";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';
import { NointernetPage } from '../pages/nointernet/nointernet';
import { ForgotPage } from '../pages/forgot/forgot';
import { NetworkProvider } from '../providers/network-service/network-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: StorageProvider,
              network: Network, networkProvider: NetworkProvider, events: Events, public toastCtrl: ToastController
  ) {

    platform.ready().then(() => {

      statusBar.styleDefault();
      // @todo research a little bit more
      if (splashScreen) {
        setTimeout(() => {
          splashScreen.hide();
        }, 200);
      }

      if (localStorage.getItem('x-access-token') !== null) {
          // @todo replace with one object
          storage.user = JSON.parse(localStorage.getItem('user'));
          this.rootPage = MainPage;
        } else {
          this.rootPage = LoginPage;
        }

      networkProvider.initializeNetworkEvents();

      events.subscribe('network:offline', () => {
        this.presentToast('You are offline');
        setTimeout(() => {
          this.rootPage = NointernetPage;
        },1000);
      });

      events.subscribe('network:online', () => {
        this.presentToast('You are online');
        setTimeout(() => {
          this.rootPage = LoginPage;
        },1000);
      });

    });

  }

  presentToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}

