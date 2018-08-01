import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Button, MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { HttpClient } from '@angular/common/http';
import { PendingPage } from '../pending/pending';
/**
 * Generated class for the TimesheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timesheet',
  templateUrl: 'timesheet.html',
})

export class TimesheetPage 
{  
public color:Date;
public id:any;
public us:any;
public jobs=[];
public status:number;
public gettt:any;
public hours=[];
public selctime=0;
public selcthr=0;
public selctmin=0;
public a:number;
public b:number;
public j:number;
public add = 0;
public tf:any;
public conn:any;
public abcd:any;
public urlres="http://192.168.15.61:3000/api/TimeSheetTables/";
public savee=
{
  "Name": "abc",
  "DefaultTask2": 0,
  "DefaultTask3": 0,
  "OtherTask": 0,
  "Status": 0,
  "TotalHours": 0,
  "DefaultTask1": 0,
  "Date": "string",
  "EmpId": 0,
  "GuId": "def"
}

constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController, public api: ApiServiceProvider, public http: HttpClient,public menu:MenuController) 
{
  this.menu.enable(false,"Mymenu");
  this.color=navParams.get('data');
  this.id=this.api.id1;
 
} 

addtime(abc)
{
  this.b=this.jobs.indexOf(abc);
  let alert = this.alertCtrl.create(
    {
      title: 'TIME',
      inputs: 
      [
        {
          name: 'hour',
          placeholder: 'Enter Hour'
        },
        {
          name: 'minutes',
          placeholder: 'Enter Minutes',
          
        }
      ],
      buttons: 
      [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => 
          {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => 
          {
            if(data.hour==='')
            {
              this.selcthr=0;
              console.log(this.selcthr)
            }
            else
            {
              this.selcthr=parseInt(data.hour);
              console.log(this.selcthr)
            }
            if(data.minutes==='')
            {
              this.selctmin=0;
              console.log(this.selctmin)
            }
            else
            {
              this.selctmin=parseInt(data.minutes);
              console.log(this.selctmin)
            }
        
            this.j= this.selctmin/60
            this.j=parseFloat(this.j.toFixed(2));
            console.log(this.j)
            this.selctime= this.selcthr+this.j;
            console.log(this.selctime);
            this.hours[this.b]=this.selctime;
            this.add=0;
            for(var i=0;i<this.hours.length;i++)
            {
              this.add=this.add+this.hours[i];
            }
        
          }
                    
        }
      ]
    });
  alert.present();



}

removeItem(delh: any)
{
  this.a =this.hours.indexOf(delh);
  if(this.a!=-1)
  {
    this.hours[this.a]=0;
  }
  this.add=this.add-delh;

}


save()
{
  const confirm = this.alertCtrl.create(
  {
    title: 'Conformation',
    message: 'Do you want to save the timesheet',
    buttons: 
    [
      {
        text: 'Disagree',
         handler: () => 
        {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => 
        {
          this.savee.Date=String(this.color);
          this.savee.EmpId=this.id;
          this.savee.Status=1;
          this.savee.TotalHours=this.add;
          this.savee.DefaultTask1=this.hours[0];
          this.savee.DefaultTask2=this.hours[1];
          this.savee.OtherTask=this.hours[2];
          this.savee.DefaultTask3=this.hours[3];
          console.log("beforesave")
          console.log(this.savee)
          this.api.pushtime(this.savee,this.color);
          let toast = this.toastCtrl.create(
          {
            message: 'Successfully Saved',
            duration: 3000,
            position: 'center'
          });
          
          toast.onDidDismiss(() => 
          {
            console.log('Dismissed toast');
          });
          toast.present();
        }
      }
    ]
  });
  confirm.present();
}

submit()
{
  const confirm = this.alertCtrl.create(
  {
    title: 'Conformation',
    message: 'Do you want to submit the timesheet',
    buttons: 
    [
      {
        text: 'Disagree',
        handler: () => 
        {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => 
        {
          this.savee.Date=String(this.color);
          this.savee.EmpId=this.id;
          this.savee.Status=2;
          this.savee.TotalHours=this.add;
          this.savee.DefaultTask1=this.hours[0];
          this.savee.DefaultTask2=this.hours[1];
          this.savee.DefaultTask3=this.hours[2];
          this.savee.OtherTask=this.hours[3];
          console.log("beforesubmit")
          console.log(this.savee)
          this.api.pushtime(this.savee,this.color);
    
          (<HTMLInputElement> document.getElementById("save")).disabled = true;
          (<HTMLInputElement> document.getElementById("submit")).disabled = true;
          let toast = this.toastCtrl.create(
          {
            message: 'Successfully submitted',
            duration: 3000,
            position: 'center'
          });
          
          toast.onDidDismiss(() => 
          {
            console.log('Dismissed toast');
          });
          toast.present();
        }
      }
    ]
  });
  confirm.present();
}

pop()
{
  this.navCtrl.setRoot(PendingPage);
}

ionViewDidLoad() 
{
  new Promise(resolve =>
  {
    this.http.get('http://localhost:3000/api/TimeSheetTables/'+this.id+'%2B'+this.color+'/exists').subscribe(trf =>
  {
    resolve(trf);
    console.log(trf);
    this.tf=trf;
    if(this.tf.exists===true)
    {
      console.log(this.tf.exists)
      
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
          
          if(this.status===2)
          {
            (<HTMLInputElement> document.getElementById("save")).disabled = true;
            (<HTMLInputElement> document.getElementById("submit")).disabled = true;
          }
        }, err => 
        {
          console.log(err)
        });
      });
     

  });
  });
      
      
    }
    else
    {
      this.api.getjob()
  .then(data => 
  {
    this.us = data;
    for(var i=0;i<this.us.length;i++)
    {
      this.jobs[i]=this.us[i].JobName;
      this.hours[i]=0;
    }  
  });
      this.savee.Date=String(this.color);
      this.savee.EmpId=this.id;
      this.savee.Status=0;
      this.savee.TotalHours=0;
      this.savee.DefaultTask1=0;
      this.savee.DefaultTask1=0;
      this.savee.DefaultTask1=0;
      this.savee.OtherTask=0;
      this.savee.GuId=this.id+'+'+this.color;
      this.api.pushtimeline(this.savee)
      
    }
  });
  });
} 
}