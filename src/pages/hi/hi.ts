import { Component } from '@angular/core';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the HiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hi',
  templateUrl: 'hi.html',
})
export class HiPage {
  password = {nnew: '', rnew: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiServiceProvider,public toastCtrl:ToastController,public http:HttpClient) {
    this.api.id1;
  }
changepwd(){

if(this.password.nnew===this.password.rnew)
{
  //new Promise(resolve => {
   // this.http.get(this.urlres+this.id+"%2B"+this.color).subscribe(timesheet => {
  //    console.log(timesheet)
     
  //  }, err => {
     
   //   console.log(err);

   // });
 // });


}
else{
  let toast = this.toastCtrl.create({
    message: 'Passwords Does Not Match',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();



}



}
  ionViewDidLoad() {
    console.log('ionViewDidLoad HiPage');
  }

}
