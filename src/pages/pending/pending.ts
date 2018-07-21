import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { TimesheetPage } from './../timesheet/timesheet';
import { CalendarComponentOptions, CalendarComponent } from 'ion2-calendar'
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

public date: Date;
public type: string;
public fyear=2018;
public fmon=5;
public fdate;
public tyear=2018;
public tmon=6;
public tdate=25;
public count=0;
public usrs:any;
public id:any;
public sp1:any;
public sp2:any;
public start:string;
public end:any;
public tar:any;
public far:any;
public options:CalendarComponentOptions;
pendmonths=[1,2,3,4];
public difmonths:any;
public contractorUrl='http://localhost:3000/api/ContractorTables';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, public api:ApiServiceProvider) {

    this.id=this.api.id1;
    console.log("hifrompend");
    console.log(this.id);
  this.getUsers();
  this.getUsers1();
}
getUsers() {
this.api.getUsersa(this.id)
.then(data => {
 this.usrs = data;
console.log("hello322"+this.usrs.Name);
});
 }
 
 getUsers1() {
  this.api.getUsersa(this.id)
  .then(data => {
   this.usrs = data;
   
   this.start=String(this.usrs.StartDate);
   
    this.sp1=this.start.split("-");
    this.tyear=parseInt(this.sp1[0]);
   
    this.tmon=parseInt(this.sp1[1]);
   
    this.tdate=parseInt(this.sp1[2]);
   
   this.end=this.usrs.EndDate;
   
   this.sp2=this.end.split("-");
   this.far=parseInt(this.sp2[0]);
   
   this.tar=parseInt(this.sp2[1]);
   
   this.fdate=parseInt(this.sp2[2]);
   
  this.options = {
  
    disableWeeks:[0,6],
    from:new Date(this.far,this.tar,this.fdate),
    to:new Date(this.tyear,this.tmon,this.tdate)
  
  
  }
  
  });
   }

onChange(){
  

  this.navCtrl.push(TimesheetPage, {
    data: this.date.getDate()});
  


}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingPage');
   }



}
