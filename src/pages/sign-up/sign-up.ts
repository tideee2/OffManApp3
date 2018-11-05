import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  public regForm: FormGroup;
  public EMAILPATTERN = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  public PASSPATTERN = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
  public validation_messages;
  public isPasswordMatched = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              // public auth: AuthService,
              public alertController: AlertController,
  ) {
    this.regForm = formBuilder.group({
      username: [null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*')]
        )],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.EMAILPATTERN)])],
      matchingPasswords: formBuilder.group({
          password: ['',
            Validators.compose([
              Validators.required,
              Validators.maxLength(12),
              Validators.minLength(5),
              Validators.pattern('[a-zA-Z0-9 ]*')]
            )],
          confirm_password: ['',
            Validators.compose([
              Validators.required,
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
      'username': {
        required: 'Username is required.',
        minlength: 'Username must be at least 3 characters long.',
        maxlength: 'Username cannot be more than 10 characters long.',
        pattern: 'Your username must contain only letters.'
      },
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
      'confirm_password': {
        required: 'Confirm password is required',
        minlength: 'Confirm password must be at least 5 characters long',
        maxlength: 'Confirm password cannot be more than 12 characters long',
        pattern: 'Your confirm password must contain at least one uppercase, one lowercase, and one number',
        areEqual: 'Password mismatch'
      },
      'matchingPasswords': {
        comparePasswords: 'Passwords mismatch'
      }
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  comparePasswords(group: FormGroup): { [key: string]: any } {
    const password = group.controls['password'];
    const confirmPassword = group.controls['confirm_password'];
    if (password.value !== confirmPassword.value) {
      return {'comparePasswords': true};
    }
    return null;
  }

  private submit(event) {
    if (this.regForm.valid) {
      console.log('Form is valid.');
    } else {
      console.log('Form is invalid.');
    }
  }

  get username() {
    return this.regForm.get('username');
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('matchingPasswords.password');
  }

  get confirm_password() {
    return this.regForm.get('matchingPasswords.confirm_password');
  }

  getErrorMessage(name: string): any {
    const res = [];
    Object.keys(this[name].errors).forEach((error) => {
      res.push(this.validation_messages[name][error]);
    });
    return res[0];
  }

  submitRegister(): void {
    // this.auth.registerUser(this.username.value, this.email.value, this.password.value).subscribe(value => {
    //     console.log(value);
    //     this.presentAlert('Message', 'Register is successful. Check your email');
    //   },
    //   error => {
    //     console.log(error);
    //     if (error.status === 200) {
    //       this.presentAlert('Message', error.error.text + ' and login');
    //       this.router.navigate(['login']);
    //     } else {
    //       console.log(error);
    //       this.presentAlert('Error', error.statusText);
    //     }
    //   });
  }

  qq() {
    console.log(this.regForm.get('username'));
    console.log(this.username);
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
  loginClick() {
    this.navCtrl.pop();
  }
}
