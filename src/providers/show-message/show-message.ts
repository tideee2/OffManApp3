import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the ShowMessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShowMessageProvider {

  constructor(public http: HttpClient, public alertSrv: AlertController) {
    console.log('Hello ShowMessageProvider Provider');
  }

  presentAlert(title, messageText) {
    let alert = this.alertSrv.create({
      title: title,
      message: messageText,
      buttons: ['Ok']
    });
    alert.present();
  }
}
