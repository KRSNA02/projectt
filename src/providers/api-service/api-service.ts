import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {
public id1:any;
  private url: string = "http://localhost:3000/api/EmployeeTables"
  private url1: string='http://localhost:3000/api/ContractorTables';
  private url2: string="";
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
  
}
