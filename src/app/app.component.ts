import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CalendarModule } from "ion2-calendar";
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { LoginPage } from '../pages/login/login';
import { PendingPage } from '../pages/pending/pending';
import { SettingsPage } from '../pages/settings/settings';
import { TimesheetPage } from '../pages/timesheet/timesheet';
import { ViewhistoryPage } from '../pages/viewhistory/viewhistory';


import { AuthServiceProvider } from './../providers/auth-service/auth-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public auth: AuthServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  gotoHome(){
    this.nav.setRoot(HomePage);
    
      }
      gotoDash() {
        this.nav.setRoot(HistoryPage);
    
      }
      gotoPend() {
        this.nav.setRoot(PendingPage);
    
      }
      gotoSettings() {
        this.nav.setRoot(SettingsPage);
    
      }
}

