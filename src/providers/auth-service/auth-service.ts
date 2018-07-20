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
  credUrl='http://localhost:3000/api/EmployeeTables'
  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
   }
 
currentUser: User;
cred_var:any;
 
  public login(credentials) {
    
      return new Promise(resolve => {
        this.http.get(this.credUrl+'/'+credentials.email).subscribe(data => {
          resolve(data);
          this.cred_var=data
          console.log(this.cred_var.Password);
          if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
             } else {
              return Observable.create(observer => {
             
              let access = (credentials.password === this.cred_var.Password && credentials.email === this.cred_var.EmpId);
             this.currentUser = new User('BALA', 'bala@gmail.com');
              observer.next(access);
              observer.complete();
            });
          }
        }, err => {
          console.log(err);
        });
      });





  
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

 
}
