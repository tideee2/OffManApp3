import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseDatePage } from './choose-date';

@NgModule({
  declarations: [
    ChooseDatePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseDatePage),
  ],
})
export class ChooseDatePageModule {}
