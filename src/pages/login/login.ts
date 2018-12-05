import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignUpPage} from "../sign-up/sign-up";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {ForgotPage} from "../forgot/forgot";
import {MainPage} from "../main/main";
import {StorageProvider} from "../../providers/storage/storage";
import { ErrorsProvider } from '../../providers/errors/errors';
import { ShowMessageProvider } from '../../providers/show-message/show-message';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public EMAILPATTERN = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  public loginForm: FormGroup;
  public validation_messages;

  constructor(public formBuilder: FormBuilder, public alertController: AlertController,
              public navCtrl: NavController, public errorSrv: ErrorsProvider,
              public msgSrv: ShowMessageProvider,
              public network: Network,
              public auth: AuthServiceProvider,
              public storageSrv: StorageProvider) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.EMAILPATTERN)])],
      password: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(5),
          Validators.pattern('[a-zA-Z0-9 ]*')]
        )]
    });
    this.validation_messages = {
      'email': {
        required: 'Email is required',
        pattern: 'Enter a valid email'
      },
      'password': {
        required: 'Password is required',
        minlength: 'Password must be at least 5 characters long',
        maxlength: 'Password cannot be more than 12 characters long',
        pattern: 'Your password must contain at least one uppercase, one lowercase, and one number'
      },
    };
    console.log(this.network.type);
  }

  ionViewDidLoad() {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submitLogin(_email?, _pass?): void {
    _email = _email || this.email.value;
    _pass = _pass || this.password.value;
    this.auth.loginUser(_email, _pass).subscribe((value: any) => {
        this.msgSrv.presentAlert('Message', 'Login is successful. Welcome.');
        // @todo replace with small object
        this.storageSrv.user = value.user;
        console.log(value.user);
        localStorage.setItem('user', JSON.stringify(value.user));
        localStorage.setItem('x-access-token', value.token);
        this.navCtrl.setRoot(MainPage);
      },
      error => {
        if (error.status === 200) {
          this.msgSrv.presentAlert('Message', error.error.text + ' and login');
        } else {
          this.msgSrv.presentAlert('Error', error.error);
        }
      });
  }



  registerClick() {
    this.navCtrl.push(SignUpPage);
  }

  forgotClick() {
    this.navCtrl.push(ForgotPage);
  }
}
