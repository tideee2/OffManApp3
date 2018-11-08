import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {MainPage} from "../pages/main/main";
import {AddTransactionPage} from "../pages/add-transaction/add-transaction";
import {ChangePage} from "../pages/change/change";
import {ForgotPage} from "../pages/forgot/forgot";
import {SettingsPage} from "../pages/settings/settings";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {AuthServiceProvider} from '../providers/auth-service/auth-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { StorageProvider } from '../providers/storage/storage';
import { AuthInterceptor } from '../auth/auth-interceptor';
import { ErrorsProvider } from '../providers/errors/errors';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MainPage,
    AddTransactionPage,
    ChangePage,
    ForgotPage,
    SettingsPage,
    SignUpPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MainPage,
    AddTransactionPage,
    ChangePage,
    ForgotPage,
    SettingsPage,
    SignUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    StorageProvider,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ErrorsProvider
  ]
})
export class AppModule {
}
