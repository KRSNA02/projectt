import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { ViewhistoryPage } from '../viewhistory/viewhistory';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public date:Date;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  options: CalendarComponentOptions = {
    
    disableWeeks:[0,6],
    from: new Date(2000,2-1,1),
    to: new Date(9999,12-1,31)
  };
onChange(){
  

  this.navCtrl.push(ViewhistoryPage, {
    data: moment(this.date).format("YYYY-MM-DD") });
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
