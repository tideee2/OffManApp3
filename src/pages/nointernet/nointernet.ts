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

  constructor(public navCtrl: NavController, public navParams: NavParams, public network: Network) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NointernetPage');
  }

}
