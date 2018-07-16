import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';
/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  private url: string = "http://localhost:3000/api/EmployeeTables"

  constructor(public http: HttpClient) {
    console.log('Hello ApiServiceProvider Provider');
  }

  
}
