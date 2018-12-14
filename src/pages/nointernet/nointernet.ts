import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { LoginPage } from '../login/login';

/**
 * Generated class for the NointernetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nointernet',
  templateUrl: 'nointernet.html',
})
export class NointernetPage {
  connectSubscription: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public network: Network) {
    // this.connectSubscription = this.network.onConnect().subscribe(() => {
    //   console.log('network connected!');
    //   setTimeout(() => {
    //     if (this.network.type !== 'none') {
    //       console.log('we got a wifi connection, woohoo!');
    //       this.navCtrl.setRoot(LoginPage);
    //     }
    //   }, 1000);
    // });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NointernetPage');
  }
  ionViewWillUnload() {
    // this.connectSubscription.unsubscribe();
  }
}
