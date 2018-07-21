import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Button } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
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

export class TimesheetPage {
  
color:Date;
users: any; 
id:any;
public poss={
    
  "Name": "sivaattt",
  "DefaultTask2": 0,
  "DefaultTask3": 33,
  "OtherTask": 0,
  "Status": 1,
  "TotalHours": 0,
  "EmpId": 2552,
  "DefaultTask1": 0,
  "Date": "2018-9-25"

}
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController, public api: ApiServiceProvider) {
    this.color=navParams.get('data');
    console.log("Const time")
    console.log(this.color)
    this.id=this.api.id1;
 
  } 
getUsers() {
  this.api.getUsersb(this.id)
  .then(data => {
  this.users = data;
  console.log(this.users);
  console.log("hello222"+this.users.Name);
  console.log(this.users.Status);


  });
 }
public hours=[0,0,0,0];
public selctval='';
selctime=0;
public selcthr=0;
public selctmin=0;
public works=["Health Check","Others","Meeting","OptIN"];
public times=[1,2,3,4,5,6,7,8];
public i:number;
public a:number;
public b:number;
public delw: string;
public j:number;
public flag:boolean=false;
public savee={
  "Name": " ",
  "DefaultTask2": 0,
  "DefaultTask3": 0,
  "OtherTask": 0,
  "Status": 0,
  "TotalHours": 0,
  "EmpId": 0,
  "DefaultTask1": 0,
  "Date": " "
}
add = 0;
addtime(abc){

  this.b=this.works.indexOf(abc);
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'hour',
          placeholder: 'Enter Hour'
        },
        {
          name: 'minutes',
          placeholder: 'Enter Minutes',
          
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            if(data.hour==='')
            {this.selcthr=0;
            console.log(this.selcthr)}
            else{
            this.selcthr=parseInt(data.hour);
            console.log(this.selcthr)}
            if(data.minutes==='')
            {this.selctmin=0;
            console.log(this.selctmin)}
            else{
            this.selctmin=parseInt(data.minutes);
            console.log(this.selctmin)}
        
            this.j= this.selctmin/60
              this.j=parseFloat(this.j.toFixed(2));
              console.log(this.j)
              this.selctime= this.selcthr+this.j;
              console.log(this.selctime);
        
              this.hours[this.b]=this.selctime;
              this.add = this.add + this.selctime;
        
            }
                    
                }
              
        
      ]
    });
    alert.present();



}

removeItem(delh: any){
  this.a =this.hours.indexOf(delh);
  if(this.a!=-1)
  {
    this.hours[this.a]=0;
  }
  this.add=this.add-delh;

}


save()
{

  
    const confirm = this.alertCtrl.create({
      title: 'Conformation',
      message: 'Do you want to save the timesheet',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            
            this.getUsers();
            let toast = this.toastCtrl.create({
              message: 'Successfully Saved',
              duration: 3000,
              position: 'center'
            });
          
            toast.onDidDismiss(() => {
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

  const confirm = this.alertCtrl.create({
    title: 'Conformation',
    message: 'Do you want to submit the timesheet',
    buttons: [
      {
        text: 'Disagree',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          let toast = this.toastCtrl.create({
            message: 'Successfully submitted',
            duration: 3000,
            position: 'center'
          });
          
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        
          toast.present();
        }
      }
    ]
  });
  confirm.present();





}





  ionViewDidLoad() {
    console.log('ionViewDidLoad TimesheetPage');
    console.log(this.color)

  }

  
}

