import { Component } from '@angular/core';
import { NavController, IonicPage,NavParams, ActionSheetController,ToastController,Platform,LoadingController,Loading, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from './../login/login';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions  } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer,TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import 'rxjs';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

declare var cordova:any;
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  designation = '';
  fdate = "";
  tdate = "";
  base64Image:any;
  id:any;
  sta='';
  lastImage:string=null;
  lastImage1:string=null;
  loading:Loading;
  usrsctrt:any;
  usrtime:any;
  usremp:any;
  employeeUrl="http://192.168.15.61:3000/api/EmployeeTables";
  contractorUrl='http://192.168.15.61:3000/api/ContractorTables';
  timesheetUrl='http://192.168.15.61:3000/api/TimeSheetTables';
  constructor(private nav: NavController,public navParams: NavParams, private auth: AuthServiceProvider,public camera:Camera,public http:HttpClient, public transfer:Transfer, public file:File,public filePath:FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl:ToastController,public platform:Platform, public loadingCtrl:LoadingController,public menu:MenuController,public api:ApiServiceProvider ) {
    this.id=this.api.id1;
    this.menu.enable(true,"Mymenu");
    console.log(this.id);
    this.empdet();
    this.condet();
    this.timedet();
  }
  empdet(){
    this.api.getUsers(this.id)
    .then(data => {
      this.usremp=data;
      console.log(this.usremp)
      this.designation=this.usremp.Designation;
      this.username=this.usremp.Name;
    }, err => {
      console.log(err);

    });



  }

  condet(){

    this.api.getUsersa(this.id)
    .then(data => {
      this.usrsctrt=data;
        console.log(this.usrsctrt)
        this.fdate=this.usrsctrt.StartDate;
      
        console.log(this.usrsctrt.StartDate);
        this.tdate=this.usrsctrt.EndDate;
        console.log(this.usrsctrt.EndDate);
        
      }, err => {
        console.log(err);
      });



  }
  

timedet(){

  this.api.getUsersb(this.id)
    .then(data => {
      this.usrtime=data;
        console.log(this.usrsctrt)
        this.usrtime=data;
        if(parseInt(this.usrtime.Status) === 0 )
        {

          this.sta='Not Submitted';

        }
        else if(parseInt(this.usrtime.Status) === 1 )
        {this.sta='Submitted';}
        else if(parseInt(this.usrtime.Status) === 2 )
        {this.sta='Approved';}
      }, err => {
        console.log(err);
      });
}


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
 
  public takePicture(sourceType) {

    // Create options for the Camera Dialog
  
    var options = {
  
      quality: 100,
  
      sourceType: sourceType,
  
      saveToPhotoAlbum: false,
  
      correctOrientation: true
  
    };
  
   
  
    // Get the data of an image
  
    this.camera.getPicture(options).then((imagePath) => {
  
      // Special handling for Android library
  
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
  
        this.filePath.resolveNativePath(imagePath)
  
          .then(filePath => {
  
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
  
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
  
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
  
          });
  
      } else {
  
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
  
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
  
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
  
      }
  
    }, (err) => {
  
      this.presentToast('Error while selecting image.');
  
    });
  
  }

  public createFileName() {

    var d = new Date(),
  
    n = d.getTime(),
  
    newFileName =  n + ".jpg";
  
    return newFileName;
  
  }
  
   
  
  // Copy the image to a local folder
  
  public copyFileToLocalDir(namePath, currentName, newFileName) {
  
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
  
      this.lastImage = newFileName;
  
    }, error => {
  
      this.presentToast('Error while storing file.');
  
    });
  
  }
  
   
  
  public presentToast(text) {
  
    let toast = this.toastCtrl.create({
  
      message: text,
  
      duration: 3000,
  
      position: 'top'
  
    });
  
    toast.present();
  
  }
  
   
  
  // Always get the accurate path to your apps folder
  
  public pathForImage(img) {
  
    if (img === null) {
  
      return '../../assets/imgs/profile.jpg';
  
    } else {
  
      return cordova.file.dataDirectory + img;
  
    }
  
  }

  public uploadImage() {

    // Destination URL
  
    var url = "http://yoururl/upload.php";
  
   
  
    // File for Upload
  
    var targetPath = this.pathForImage(this.lastImage);
  
   
  
    // File name only
  
    var filename = this.lastImage;
  
   
  
    var options = {
  
      fileKey: "file",
  
      fileName: filename,
  
      chunkedMode: false,
  
      mimeType: "multipart/form-data",
  
      params : {'fileName': filename}
  
    };
  
   
  
    const fileTransfer: TransferObject = this.transfer.create();
  
   
  
    this.loading = this.loadingCtrl.create({
  
      content: 'Uploading...',
  
    });
  
    this.loading.present();
  
   
  
    // Use the FileTransfer to upload the image
  
    fileTransfer.upload(targetPath, url, options).then(data => {
  
      this.loading.dismissAll()
  
      this.presentToast('Image succesful uploaded.');
  
    }, err => {
  
      this.loading.dismissAll()
  
      this.presentToast('Error while uploading file.');
  
    });
  
  }



  presentActionSheet1() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
 
  public takePicture1(sourceType) {

    // Create options for the Camera Dialog
  
    var options = {
  
      quality: 100,
  
      sourceType: sourceType,
  
      saveToPhotoAlbum: false,
  
      correctOrientation: true
  
    };
  
   
  
    // Get the data of an image
  
    this.camera.getPicture(options).then((imagePath) => {
  
      // Special handling for Android library
  
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
  
        this.filePath.resolveNativePath(imagePath)
  
          .then(filePath => {
  
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
  
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
  
            this.copyFileToLocalDir1(correctPath, currentName, this.createFileName1());
  
          });
  
      } else {
  
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
  
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
  
        this.copyFileToLocalDir1(correctPath, currentName, this.createFileName1());
  
      }
  
    }, (err) => {
  
      this.presentToast('Error while selecting image.');
  
    });
  
  }

  public createFileName1() {

    var d = new Date(),
  
    n = d.getTime(),
  
    newFileName =  n + ".jpg";
  
    return newFileName;
  
  }
  
   
  
  // Copy the image to a local folder
  
  public copyFileToLocalDir1(namePath, currentName, newFileName) {
  
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
  
      this.lastImage = newFileName;
  
    }, error => {
  
      this.presentToast('Error while storing file.');
  
    });
  
  }
  
   
   
  
  // Always get the accurate path to your apps folder
  
  public pathForImage1(img) {
  
    if (img === null) {
  
      return '//tutorialsplane.com/wp-content/uploads/2017/01/ace-1807511__340.jpg';
  
    } else {
  
      return cordova.file.dataDirectory + img;
  
    }
  
  }

  public uploadImage1() {

    // Destination URL
  
    var url = "http://yoururl1/upload.php";
  
   
  
    // File for Upload
  
    var targetPath = this.pathForImage(this.lastImage);
  
   
  
    // File name only
  
    var filename = this.lastImage;
  
   
  
    var options = {
  
      fileKey: "file",
  
      fileName: filename,
  
      chunkedMode: false,
  
      mimeType: "multipart/form-data",
  
      params : {'fileName': filename}
  
    };
  
   
  
    const fileTransfer: TransferObject = this.transfer.create();
  
   
  
    this.loading = this.loadingCtrl.create({
  
      content: 'Uploading...',
  
    });
  
    this.loading.present();
  
   
  
    // Use the FileTransfer to upload the image
  
    fileTransfer.upload(targetPath, url, options).then(data => {
  
      this.loading.dismissAll()
  
      this.presentToast('Image succesful uploaded.');
  
    }, err => {
  
      this.loading.dismissAll()
  
      this.presentToast('Error while uploading file.');
  
    });
  
  }





  ionViewDidLoad(){
    
     
    /*new Promise(resolve => {
      this.http.get(this.contractorUrl+'/'+this.id).subscribe(contractor => {
        resolve(contractor);
        this.usrsctrt=contractor;
        console.log(this.usrsctrt)
        this.fdate=this.usrsctrt.StartDate;
      
        console.log(this.usrsctrt.StartDate);
        this.tdate=this.usrsctrt.EndDate;
        console.log(this.usrsctrt.EndDate);
        
      }, err => {
        console.log(err);
      });
    });

    new Promise(resolve => {
      this.http.get(this.employeeUrl+'/'+this.id).subscribe(employe => {
        resolve(employe);
        this.usremp=employe;
        console.log(this.usremp)
        this.designation=this.usremp.Designation;
        this.username=this.usremp.Name;
      }, err => {
        console.log(err);
      });
    });

    new Promise(resolve => {
      this.http.get(this.timesheetUrl+'/'+this.id).subscribe(timesheet => {
        resolve(timesheet);
        this.usrtime=timesheet;
        if(parseInt(this.usrtime.Status) === 0 )
        {

          this.sta='Not Submitted';

        }
        else if(parseInt(this.usrtime.Status) === 1 )
        {this.sta='Submitted';}
        else if(parseInt(this.usrtime.Status) === 2 )
        {this.sta='Approved';}
      }, err => {
        console.log(err);
      });
    });*/
       
  }
 
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }
}