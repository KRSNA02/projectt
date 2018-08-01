import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from '../../../node_modules/rxjs';
import { resolveDefinition } from '../../../node_modules/@angular/core/src/view/util';
/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {
public id1:any;
  private url: string = "http://192.168.15.61:3000/api/EmployeeTables"
  private url1: string='http://192.168.15.61:3000/api/ContractorTables';
  private url2: string='http://192.168.15.61:3000/api/TimeSheetTables';
  private url3: string="http://localhost:3000/api/JobsTables";
  
data:any;

  constructor(public http: HttpClient) {
    console.log('Hello ApiServiceProvider Provider');

  }
  getUsers(id:any) {
    this.id1=id;
    return new Promise(resolve => {
      this.http.get(this.url+'/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
 
  
  getUsersa(id:any) {
    this.id1=id;
    return new Promise(resolve => {
      this.http.get(this.url1+'/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getUsersb(id:any) {
    this.id1=id;
    return new Promise(resolve => {
      this.http.get(this.url2+'/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

public pushtimeline(abc){
  console.log(abc);
  return new Promise((resolve,reject)=>{
     this.http.post('http://192.168.15.61:3000/api/TimeSheetTables',abc)
     .subscribe(res=>{ 
       resolve(res);

     },(err)=>{
       reject(err);
     });
    });
  }

  public pushtime(abc,date){
    console.log("inapi")
    console.log(abc);
    return new Promise((resolve,reject)=>{
       this.http.put('http://192.168.15.61:3000/api/TimeSheetTables/'+this.id1+'%2B'+date,abc)
       .subscribe(res=>{ 
         resolve(res);
  
       },(err)=>{
        console.log("reject")
         reject(err);
       });
      });
    }
    getjob() {
      return new Promise(resolve => {
        this.http.get(this.url3).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  
 
    gettime(abc,date){

      return new Promise(resolve => {
        this.http.get(this.url2+abc+"%2B"+date).subscribe(timesheet => {
          resolve(timesheet);
          console.log(timesheet)
          
        }, err => {
         console.log(err);
  
        });
      });
    }

}
