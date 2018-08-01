import { Component } from '@angular/core';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { IonicPage, NavController, NavParams,ToastController, AlertController, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SettingsPage } from '../settings/settings';

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
  password1 = {nnew: '', rnew: '' };
  upda={Password:''};
  id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiServiceProvider,public toastCtrl:ToastController,public http:HttpClient,public alertCtrl:AlertController, public menu:MenuController) {
    this.menu.enable(false,"Mymenu");
    this.id=this.api.id1;
  }
changepwd(){
  let regex=new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  
if(!regex.test(this.password1.nnew)){

  (<HTMLInputElement> document.getElementById("remove")).disabled = true;
  let alert = this.alertCtrl.create({
    title: 'Incorrect Type',
    subTitle: 'The password must contain one number,one uppercase letter,one lower case letter,one special character',
    buttons: ['Dismiss']
  });
  alert.present();

}else if(this.password1.nnew === this.password1.rnew)
{

  new Promise((resolve)=>{
    this.upda.Password=this.password1.nnew;
    this.http.patch('http://192.168.15.61:3000/api/EmployeeTables/'+this.id,this.upda)
    .subscribe(res=>{ 
      resolve(res);
      console.log(res);
      let toast = this.toastCtrl.create({
        message: 'Password Changed Successfully',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        this.navCtrl.setRoot(SettingsPage);
      });
    
      toast.present();
      
    },(err)=>{
     console.log(err)
     
    });
   });


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
