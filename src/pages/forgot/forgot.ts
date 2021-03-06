import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { ErrorsProvider } from '../../providers/errors/errors';
import { ShowMessageProvider } from '../../providers/show-message/show-message';

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  public EMAILPATTERN = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  public forgotForm: FormGroup;
  public validation_messages;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public authSrv: AuthServiceProvider,
              public msgSrv: ShowMessageProvider,
              public errorSrv: ErrorsProvider,
              public alertController: AlertController) {

    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.EMAILPATTERN)])]
    });
    this.validation_messages = {
      'email': {
        required: 'Email is required',
        pattern: 'Enter a valid email'
      }
    };

  }

  ionViewDidLoad() {}

  get email() { return this.forgotForm.get('email'); }

  submitForgot(): void {
    this.authSrv.forgotPassword(this.email.value).subscribe( (value) => {
        this.msgSrv.presentAlert('Message', 'Email has been sent');
        this.navCtrl.pop();
      },
      error => {
        this.msgSrv.presentAlert('Error', error.statusText );
      });
  }

}
