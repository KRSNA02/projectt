import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';

export class User {
name: string;
email: string;
 
  constructor(name: string, email: string) {
  this.name = name;
  this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {

currentUser: User;
 
  public login(credentials) {
   if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
       } else {
        return Observable.create(observer => {
       
        let access = (credentials.password === "pass" && credentials.email === "bala@gmail.com");
       this.currentUser = new User('BALA', 'bala@gmail.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
  public getUserInfo() : User {
   return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  constructor(public http: HttpClient) {
   console.log('Hello AuthServiceProvider Provider');
  }

}
