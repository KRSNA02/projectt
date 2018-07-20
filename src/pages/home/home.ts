import { Component } from '@angular/core';
import { NavController, IonicPage,NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from './../login/login';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions  } from '@ionic-native/camera';
import 'rxjs';

 
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
  sta='Submitted';
  usrs:any;
  usr:any;
  usra:any;
  usrb:any;
  employeeUrl='http://localhost:3000/api/EmployeeTables'
  contractorUrl='http://localhost:3000/api/ContractorTables'
  timesheetUrl='http://localhost:3000/api/TimeSheetTables'
  constructor(private nav: NavController,public navParams: NavParams, private auth: AuthServiceProvider,public camera:Camera,public http:HttpClient) {
    this.id=navParams.get('data');
    console.log(this.id);
  }
  
  ionViewDidLoad(){
    
     
    new Promise(resolve => {
      this.http.get(this.contractorUrl+'/'+this.id).subscribe(contractor => {
        resolve(contractor);
        this.usrs=contractor;
        console.log(this.usrs)
        this.fdate=this.usrs.StartDate;
        console.log(this.usrs.StartDate);
        this.tdate=this.usrs.EndDate;
        console.log(this.usrs.EndDate);
        
      }, err => {
        console.log(err);
      });
    });

    new Promise(resolve => {
      this.http.get(this.timesheetUrl+'/'+this.id).subscribe(timesheet => {
        resolve(timesheet);
        this.usr=timesheet;
        if(parseInt(this.usr.Status) === 0 )
        {

          this.sta='Not Submitted';

        }
        else if(parseInt(this.usr.Status) === 1 )
        {this.sta='Submitted';}
        else if(parseInt(this.usr.Status) === 2 )
        {this.sta='Approved';}
      }, err => {
        console.log(err);
      });
    });
       console.log("view")
       console.log(this.usra);
       console.log(this.fdate);
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