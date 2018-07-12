import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  id: number;
  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

 
  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.nav.setRoot('HomePage');
      } else {
        this.showError("Access Denied");
      }
    },
    //  error => {
      //  this.showError(error);
   //   }
    );
  }
 forgot(){

  let alert = this.alertCtrl.create({
    title: 'Forgot',
    inputs: [
      {
        name: 'ID',
        placeholder: 'Enter ID'
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
        text: 'Submit',
        handler: data => {
          this.id=data.ID;

          const alert = this.alertCtrl.create({
            title: 'Alert!',
            subTitle: 'The Password has been sent to your registered email id',
            buttons: ['OK']
          });
          alert.present();

        }
      }
    ]
  });
  alert.present();
//this.nav.push(PendingDetailPage);



 }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}