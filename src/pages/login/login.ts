import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignUpPage} from "../sign-up/sign-up";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {ForgotPage} from "../forgot/forgot";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
              public navCtrl: NavController,
              public auth: AuthServiceProvider,
              // public storageSrv: StorageService, public transService: TransactionsService
  ) {
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }
  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  getErrorMessage(name: string): any {
    const res = [];
    Object.keys(this[name].errors).forEach((error) => {
      res.push(this.validation_messages[name][error]);
    });
    return res[0];
  }

  submitLogin(_email?, _pass?): void {
    _email = _email || this.email.value;
    _pass = _pass || this.password.value;
    console.log(_email, _pass);
    console.log(this.loginForm);
    this.auth.some();
    this.auth.loginUser(_email, _pass).subscribe( (value: any) => {
        console.log(value);
        // this.presentAlert('Message', 'Login is successful. Welcome.');
        // this.storageSrv.balance = value.user.balance;
        // this.storageSrv.email = value.user.email;
        // this.storageSrv.name = value.user.name;
        // this.storageSrv.userId = value.user._id;
        // this.storageSrv.token = value.token;
        // localStorage.setItem('x-access-token', value.token);
        // localStorage.setItem('balance', value.user.balance);
        // localStorage.setItem('id', value.user._id);
        // localStorage.setItem('name', value.user.name);
        // localStorage.setItem('email', value.user.email);
        // this.transService.balance = value.user.balance;
        // this.transService.email = value.user.email;
        // this.transService.id = value.user._id;
        // this.transService.token = value.token;
        // this.transService.name = value.user.name;
        // console.log(value);
        // this.router.navigate(['main']);
      },
      error => {
        console.log(error);
        if (error.status === 200) {
          // this.presentAlert('Message', error.error.text + ' and login');
          // this.router.navigate(['login']);
        } else {
          // this.presentAlert('Error', error.error);
        }
      });
  }

  // async presentAlert(headerText: string, messageText: string) {
  //   const alert = await this.alertController.create({
  //     header: headerText,
  //     // subHeader: 'Subtitle',
  //     message: messageText,
  //     buttons: [
  //       {
  //         text: 'Ok',
  //       }]
  //   });
  //
  //   await alert.present();
  // }

  registerClick() {
    // this.navCtrl.push(SignUpPage);
    this.navCtrl.push(SignUpPage);
  }

  forgotClick() {
    this.navCtrl.push(ForgotPage);
  }
}
