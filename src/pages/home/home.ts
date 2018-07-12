import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from './../login/login';
 
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
  constructor(private nav: NavController, private auth: AuthServiceProvider) {
    
  }
 
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }
}