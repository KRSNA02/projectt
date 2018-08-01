import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,AlertController,ToastController } from 'ionic-angular';
import {ApiServiceProvider} from '../../providers/api-service/api-service';
import { HiPage } from '../hi/hi';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  id:any;
  users:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menu:MenuController,public api:ApiServiceProvider,public alertCtrl:AlertController,private toastCtrl: ToastController) {
    this.menu.enable(true,"Mymenu");
    this.id=this.api.id1;
  }

  changepwd(){
    let alert = this.alertCtrl.create({
      title: 'Password Change',
      inputs: [
        
        {
          name: 'password',
          placeholder: 'Enter old Password',
          type: 'password'
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
          text: 'Check',
          handler: data => {

            this.api.getUsers(this.id).then(emp => {
              this.users = emp;
              console.log(this.users);
              console.log("hello222"+this.users.Password);
              if (data.password === this.users.Password) {
                this.navCtrl.push('HiPage');
              } else {
                let toast = this.toastCtrl.create({
                  message: 'Incorrect Password',
                  duration: 3000,
                  position: 'bottom'
                });
              
                toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
                });
              
                toast.present();
                return false;
              }
            
            
              });

            
          }
        }
      ]
    });
    alert.present();




  }
  deletime()
  {
    let alert = this.alertCtrl.create({
      title: 'Delete An Element',
      subTitle: 'To delete an element in timesheet swipe left near the hours list which you want to delete and press delete button',
      buttons: ['Dismiss']
    });
    alert.present();


  }

  chanpic()
  {
    let alert = this.alertCtrl.create({
      title: 'Change Picture',
      subTitle: 'To change the profile or cover picture press the button at the right bottom corner of Home Page and select the required option',
      buttons: ['Dismiss']
    });
    alert.present();


  }
  Addarecord()
  {
    let alert = this.alertCtrl.create({
      title: 'Add Record',
      subTitle: 'To add a record in timesheet go to pending page from side menu and select the required date. Then select on the required job to add the number  of hours for that particular date.',
      buttons: ['Dismiss']
    });
    alert.present();


  }

  savesum()
  {
    let alert = this.alertCtrl.create({
      title: 'Button',
      subTitle: 'SAVE- The details will be saved and can be edited. SUBMIT- The details will be submitted and cannot be edited.',
      buttons: ['Dismiss']
    });
    alert.present();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    
  }

}
