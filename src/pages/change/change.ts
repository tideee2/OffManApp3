import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {StorageProvider} from "../../providers/storage/storage";
import { ErrorsProvider } from '../../providers/errors/errors';
import { ShowMessageProvider } from '../../providers/show-message/show-message';

/**
 * Generated class for the ChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change',
  templateUrl: 'change.html',
})
export class ChangePage {
  public changeForm: FormGroup;
  public validation_messages: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public authSrv: AuthServiceProvider,
              public http: HttpClient,
              public msgSrv: ShowMessageProvider,
              public errorSrv: ErrorsProvider,
              public alertController: AlertController,
              public storageSrv: StorageProvider
  ) {
    this.changeForm = formBuilder.group({
      old_password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(5),
        Validators.pattern('[a-zA-Z0-9 ]*')])],
      matchingPasswords: formBuilder.group({
          new_password: ['',
            Validators.compose([
              Validators.required,
              Validators.maxLength(12),
              Validators.minLength(5),
              Validators.pattern('[a-zA-Z0-9 ]*')]
            )],
          confirm_password: ['',
            Validators.compose([
              // Validators.required,
              Validators.maxLength(12),
              Validators.minLength(5),
              Validators.pattern('[a-zA-Z0-9 ]*')]
            )],
        },
        {
          validator: this.comparePasswords
        }),
    });

    this.validation_messages = {
      'email': {
        required: 'Email is required',
        pattern: 'Enter a valid email'
      },
      'old_password': {
        required: 'Password is required',
        minlength: 'Password must be at least 5 characters long',
        maxlength: 'Password cannot be more than 12 characters long',
        pattern: 'Your password must contain at least one uppercase, one lowercase, and one number'
      },
      'new_password': {
        required: 'Confirm password is required',
        minlength: 'Confirm password must be at least 5 characters long',
        maxlength: 'Confirm password cannot be more than 12 characters long',
        pattern: 'Your confirm password must contain at least one uppercase, one lowercase, and one number',
        areEqual: 'Password mismatch'
      },
      'confirm_password': {
        required: 'Confirm password is required',
        minlength: 'Confirm password must be at least 5 characters long',
        maxlength: 'Confirm password cannot be more than 12 characters long',
        pattern: 'Your confirm password must contain at least one uppercase, one lowercase, and one number',
        areEqual: 'Password mismatch'
      },
      'matchingPasswords': {
        comparePasswords: 'Passwords must not be the same'
      }
    };
  }

  ionViewDidLoad() {}

  comparePasswords(group: FormGroup): { [key: string]: any } {
    const password = group.controls['new_password'];
    const confirmPassword = group.controls['confirm_password'];
    if (password.value !== confirmPassword.value) {
      return {'comparePasswords': true};
    }
    return null;
  }

  get old_password() {
    return this.changeForm.get('old_password');
  }

  get new_password() {
    return this.changeForm.get('matchingPasswords.new_password');
  }

  get confirm_password() {
    return this.changeForm.get('matchingPasswords.confirm_password');
  }

  submitChange(): void {
    // @todo chech if id in params exists
    this.authSrv.changePassword(this.old_password.value, this.new_password.value).subscribe(value => {
        console.log(value);
        this.msgSrv.presentAlert('Message', 'Change password is successful');
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

  cancel() {
    this.navCtrl.pop();
  }
}
