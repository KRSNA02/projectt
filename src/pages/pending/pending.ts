import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController } from 'ionic-angular';
import { TimesheetPage } from './../timesheet/timesheet';
import { CalendarComponentOptions, CalendarComponent } from 'ion2-calendar'
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';

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
export class PendingPage 
{
  calendarOneWeek: String;
  @ViewChild(Nav) nav: Nav;

public date: Date;
public type: string;
public fdate:number;
public tyear:any;
public tmon:any;
public tdate:any;
public usrs:any;
public id:any;
public sp1:any;
public sp2:any;
public start:string;
public end:any;
public tar:any;
public far:any;
public options:CalendarComponentOptions;
public contractorUrl='http://192.168.15.61:3000/api/ContractorTables';

constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, public api:ApiServiceProvider,public menu:MenuController) 
{
  this.menu.enable(true,"Mymenu");
  this.id=this.api.id1;
  this.getUsers();
  this.getUsers1();
}
getUsers() 
{
  this.api.getUsersa(this.id)
  .then(data => 
  {
    this.usrs = data;
  });
}

getUsers1() 
{
  this.api.getUsersa(this.id)
  .then(data => 
  {
    this.usrs = data;
    this.start=String(this.usrs.StartDate);
    this.sp1=this.start.split("-");
    this.tyear=parseInt(this.sp1[0]);
    this.tmon=parseInt(this.sp1[1]);
    if(this.tmon===1){
      this.tmon=12
    }
    else{
      this.tmon-1;
    }
    this.tdate=parseInt(this.sp1[2]);
    this.end=this.usrs.EndDate;
    this.sp2=this.end.split("-");
   this.far=parseInt(this.sp2[0]);
   this.tar=parseInt(this.sp2[1]);
   if(this.tar==1)
   {
    this.tar=12
   }
   else
   {
    this.tar=this.tar-1;
   }
   this.fdate=parseInt(this.sp2[2]);
   
   this.options = 
   {
    disableWeeks:[0,6],
    from:new Date(this.tyear,this.tmon,this.tdate),
    to:new Date(this.far,this.tar,this.fdate)
   }
  
  });
}

onChange($event)
{
  this.navCtrl.setRoot(TimesheetPage, {
  data: moment(this.date).format("YYYY-MM-DD") });
}

ionViewDidLoad() 
{
  console.log('ionViewDidLoad PendingPage');
}
}
