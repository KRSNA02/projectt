import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CalendarModule } from "ion2-calendar";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { LoginPage } from '../pages/login/login';
import { PendingPage } from '../pages/pending/pending';
import { SettingsPage } from '../pages/settings/settings';
import { TimesheetPage } from '../pages/timesheet/timesheet';
import { ViewhistoryPage } from '../pages/viewhistory/viewhistory';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http'
import { HomePageModule } from '../pages/home/home.module';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { MomentModule } from 'angular2-moment';
import { HiPageModule } from '../pages/hi/hi.module';

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    LoginPage,
    PendingPage,
    SettingsPage,
    TimesheetPage,
    ViewhistoryPage
    
  
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    HttpClientModule,
    HomePageModule,
    MomentModule,
    HiPageModule,
    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoryPage,
    LoginPage,
    PendingPage,
    SettingsPage,
    TimesheetPage,
    ViewhistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Transfer,
    File,
    FilePath,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ApiServiceProvider
  ]
})
export class AppModule {}
