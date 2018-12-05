import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Vars } from '../../config/settings';

/**
 * Generated class for the ChooseDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-date',
  templateUrl: 'choose-date.html',
})
export class ChooseDatePage {

  public dateFrom: Date;
  public dateTo: Date;
  public listOfCategories = Vars.categories;
  public category = 'All';


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseDatePage');
  }

  ok(){
    console.log(this.dateFrom);
    console.log(this.dateTo);
  }
  cancel() {
    this.viewCtrl.dismiss({status: 'cancel'});
  }
  submitChange() {
    console.log(this.dateFrom);
    console.log(this.dateTo);
    console.log(this.category);
    this.viewCtrl.dismiss({status: 'submit', start: this.dateFrom, finish: this.dateTo, category: this.category.toString()});

  }
}
