import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { HttpClient } from '@angular/common/http';
import { HistoryPage } from '../history/history';

/**
 * Generated class for the ViewhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewhistory',
  templateUrl: 'viewhistory.html',
})
export class ViewhistoryPage {

  public color:Date;
  public gettt:any;
  public hours=[0,0,0,0];
  public works=["DefaultTask1","DefaultTask1","DefaultTask1","OtherTask"];
  public urlres="http://192.168.15.61:3000/api/TimeSheetTables/";
  public id:any;
  public add:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiServiceProvider, public http:HttpClient,public menu:MenuController) {
    //this.menu.enable(true,"Mymenu");
    this.color=navParams.get('data');
    this.id=this.api.id1;

  }
  pop(){

this.navCtrl.setRoot(HistoryPage);

  }
  ionViewDidLoad() {
    this.menu.enable(false,"Mymenu")
    console.log('ionViewDidLoad ViewhistoryPage');
    new Promise(resolve => {
      this.http.get(this.urlres+this.id+"%2B"+this.color).subscribe(timesheet => {
        resolve(timesheet);
        console.log(timesheet)
        this.gettt=timesheet;
        this.hours[0]=this.gettt.DefaultTask1;
        this.hours[1]=this.gettt.DefaultTask2;
        this.hours[2]=this.gettt.DefaultTask3;
        this.hours[3]=this.gettt.OtherTask;
        this.add=this.gettt.TotalHours;
      }, err => {
       console.log(err);

      });
    });
  }

}
