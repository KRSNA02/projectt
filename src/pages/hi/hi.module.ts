import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HiPage } from './hi';

@NgModule({
  declarations: [
    HiPage,
  ],
  imports: [
    IonicPageModule.forChild(HiPage),
  ],
})
export class HiPageModule {}
