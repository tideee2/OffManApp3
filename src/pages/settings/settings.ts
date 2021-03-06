import {Component, ViewChildren} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {StorageProvider} from "../../providers/storage/storage";
import {ChangePage} from "../change/change";
import {LoginPage} from "../login/login";
import { ErrorsProvider } from '../../providers/errors/errors';
import { ShowMessageProvider } from '../../providers/show-message/show-message';

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
              public msgSrv: ShowMessageProvider,
              public storageSrv: StorageProvider,
              public errorSrv: ErrorsProvider,
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
    this.changePassForm.controls.username.value = this.storageSrv.user.name;
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

  editClick() {
    this.isEditName = !this.isEditName;
  }

  changeUsername() {
    this.isEditName = !this.isEditName;
    this.authSrv.changeUsername(this.username.value).subscribe(value => {
        localStorage.setItem('name', this.username.value);
        this.storageSrv.user.name = this.username.value;
        this.msgSrv.presentAlert('Message', 'Name has been changed');
      },
      error => {
        console.log(error);
        if (error.status === 200) {
          this.msgSrv.presentAlert('Message', error.error.text + ' ');
        } else {
          this.msgSrv.presentAlert('Error', error.error);
        }
      });
  }

  logout() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

  goToChangePass() {
    this.navCtrl.push(ChangePage, {});
  }

}
