import {Component, ViewChildren} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {StorageProvider} from "../../providers/storage/storage";
import {ChangePage} from "../change/change";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public changePassForm: FormGroup;
  public validation_messages;
  public token = localStorage.getItem('x-access-token');
  public name: string;
  public isEditName = false;

  @ViewChildren('qqq') inputName;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public authSrv: AuthServiceProvider,
              public alertController: AlertController,
              public storageSrv: StorageProvider
  ) {
    this.changePassForm = formBuilder.group({
      username: [null,
        Validators.compose([
          // Validators.required,
          Validators.maxLength(10),
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*')]
        )]
    });
    this.validation_messages = {
      'username': {
        required: 'Username is required.',
        minlength: 'Username must be at least 3 characters long.',
        maxlength: 'Username cannot be more than 10 characters long.',
        pattern: 'Your username must contain only letters.'
      }
    };
    // console.log(this.transService.name);
    // console.log(localStorage.getItem('name'));
    // @ts-ignore
    // this.changePassForm.controls.username.value = this.transService.name || localStorage.getItem('name');
    this.changePassForm.controls.username.value = 'Vasya';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  get username() {
    return this.changePassForm.get('username');
  }

  set username(val) {
    this.changePassForm.value.username = val;
  }

  getErrorMessage(name: string): any {
    const res = [];
    Object.keys(this[name].errors).forEach((error) => {
      res.push(this.validation_messages[name][error]);
    });
    return res[0];
  }

  editClick(el: HTMLElement) {
    this.isEditName = !this.isEditName;
    console.log(this.inputName);
    // this.inputName.first.focus = true;
  }

  changeUsername() {
    this.isEditName = !this.isEditName;
    // this.authSrv.changeUsername(this.username.value, this.token).subscribe(value => {
    //     console.log(value);
    //     localStorage.setItem('name', this.username.value);
    //     // this.presentAlert('Message', 'Register is successful. Check your email');
    //   },
    //   error => {
    //     console.log(error);
    //     if (error.status === 200) {
    //       // this.presentAlert('Message', error.error.text + ' and login');
    //       // this.router.navigate(['login']);
    //     } else {
    //       // this.presentAlert('Error', error.error);
    //     }
    //   });
  }

  logout() {
    localStorage.clear();
    this.navCtrl.pop();
  }

  goToChangePass() {
    this.navCtrl.push(ChangePage);
  }

}
