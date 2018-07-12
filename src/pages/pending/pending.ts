import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { TimesheetPage } from './../timesheet/timesheet';
import { CalendarComponentOptions } from 'ion2-calendar'
import { DatePipe } from '@angular/common';

 /**
 * Generated class for the PendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
})
export class PendingPage {
  calendarOneWeek: String;
  @ViewChild(Nav) nav: Nav;

date: DatePipe;
type: string;
fyear=2018;
fmon=5;
fdate=25;
tyear=2018;
tmon=6;
tdate=25;
count=0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    
  }

  options: CalendarComponentOptions = {
    
    disableWeeks:[0,6],
    from: new Date(this.fyear,this.fmon-1,this.fdate),
    to: new Date(this.tyear,this.tmon-1,this.tdate)
  };
onChange(){
  

  this.navCtrl.push(TimesheetPage, {
    data: this.date});
  


}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingPage');
  }



}
