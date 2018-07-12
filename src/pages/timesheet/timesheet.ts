import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Button } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

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
  
color: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.color=navParams.get('data');
  }

public des=[];
public hours=[];
public selctval='';
public selctime='';
public works=["Health Check","Others","Meeting","OptIN"];
public times=[1,2,3,4,5,6,7,8];

add = 0;

  additem()
  {
      this.des.push(this.selctval);
      this.hours.push(parseInt(this.selctime));
      this.add = this.add + parseInt(this.selctime);
      
      
              
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
  }

  
}

