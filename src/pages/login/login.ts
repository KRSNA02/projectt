import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiServiceProvider } from '../../providers/api-service/api-service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {id: '', password: '' };
  id: number;
  users:any;
  apiUrl = 'http://192.168.15.61:3000/api/EmployeeTables';
  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public http: HttpClient, public api:ApiServiceProvider, public menu:MenuController) {
    this.menu.enable(false,"Mymenu")
  }

 
  getUsers() {
    this.api.getUsers(this.registerCredentials.id)
    .then(data => {
      this.users = data;
      this.showLoading();
      if(parseInt(this.users.EmpId) === parseInt(this.registerCredentials.id) && this.users.Password === this.registerCredentials.password)
      {

        this.nav.setRoot('HomePage');
      }
      else{
        console.log(this.users.EmpId)
        this.showError("Access Denied");
      }
    });
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
  getData() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }


}