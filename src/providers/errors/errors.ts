import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ErrorsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErrorsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ErrorsProvider Provider');
  }
  public getErrorMessage(form: any, name: any, validation_messages:any): any {
    const res = [];
    Object.keys(form.controls[name].errors).forEach((error) => {
      res.push(validation_messages[name][error]);
    });
    return res[0];
  }
}
