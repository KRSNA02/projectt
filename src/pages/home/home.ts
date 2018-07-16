import { Component } from '@angular/core';
import { NavController, IonicPage,NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from './../login/login';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions  } from '@ionic-native/camera';

 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = 'Balakrishna';
  designation = 'Associate Software Engineer';
  fdate = "25/05/2018";
  tdate = "25/06/2018";
  base64Image:any;
  id:any;
  employeeUrl='http://localhost:3000/api/EmployeeTables'
  contractorUrl='http://localhost:3000/api/ContractorTables'
  timesheetUrl='http://localhost:3000/api/TimeSheetTables'
  constructor(private nav: NavController,public navParams: NavParams, private auth: AuthServiceProvider,public camera:Camera,public http:HttpClient) {
    this.id=navParams.get('data');
  }
  ionViewDidLoad(){
    new Promise(resolve => {
      this.http.get(this.employeeUrl+'/'+this.id).subscribe(emp => {
        resolve(emp);
        console.log(emp)
      }, err => {
        console.log(err);
      });
    });
       
    new Promise(resolve => {
      this.http.get(this.contractorUrl+'/'+this.id).subscribe(contractor => {
        resolve(contractor);
        console.log(contractor)
      }, err => {
        console.log(err);
      });
    });

    new Promise(resolve => {
      this.http.get(this.timesheetUrl+'/'+this.id).subscribe(timesheet => {
        resolve(timesheet);
        console.log(timesheet)
      }, err => {
        console.log(err);
      });
    });
       
  }


  accessGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
     }).then((imageData) => {
       this.base64Image = 'data:image/jpeg;base64,'+imageData;
      }, (err) => {
       console.log(err);
     });

     


  }
 
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }
}