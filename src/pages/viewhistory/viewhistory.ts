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
  public us:any;
  public jobs=[];
  public conn:any;
  public abcd:any;
  public status:any;
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
    this.api.getjob()
    .then(data => 
    {
      this.us = data;
      for(var i=0;i<this.us.length;i++)
      {
        this.jobs[i]=this.us[i].JobName;
        
        
        
      }  
    });
    new Promise(resolve =>
    {
      this.http.get('http://localhost:3000/api/JobsTables/count').subscribe(cont =>
    {
      resolve(cont);
      this.conn=cont;
      console.log(this.conn.count)
      new Promise(resolve => 
        {
          this.http.get(this.urlres+this.id+"%2B"+this.color).subscribe(timesheet => 
          {
            resolve(timesheet);
            this.gettt=timesheet;
            var c=0
            for(var i=1;i<this.conn.count;i++,c++)
            {
            this.abcd='DefaultTask'+i.toString();
            this.hours[c]=this.gettt[this.abcd];
            console.log(this.abcd);
            console.log(this.gettt[this.abcd]);
          }
            this.hours[c]=this.gettt.OtherTask;
            this.status=this.gettt.Status;
            this.add=this.gettt.TotalHours;
            
          }, err => 
          {
            console.log(err)
          });
        });
       
  
    });
    });
        
    
  }

}
