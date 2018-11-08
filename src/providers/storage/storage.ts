import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user-model';

@Injectable()
export class StorageProvider {

  user: UserModel;

  constructor(public http: HttpClient) {
  }

}
