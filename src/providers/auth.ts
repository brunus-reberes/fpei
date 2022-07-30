import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()

export class Auth {

  LOGIN_URL: string = "/api/auth/login";
  SIGNUP_URL: string = "/api/auth/register";
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});

  constructor(public http: Http, public local: Storage) {
  }
  createAccount(credentials){
    return new Promise((resolve, reject) => {

        this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), {headers: this.contentHeader})
          .map(res => res.json())
          .subscribe(
            res => resolve(res),
            err => reject(err)
          );

    });

  }
  login(credentials){

    return new Promise((resolve, reject) => {

        this.http.post(this.LOGIN_URL, JSON.stringify(credentials), {headers: this.contentHeader})
          .map(res => res.json())
          .subscribe(
            res => resolve(res),
            err => reject(err)
          );

    });

  }

}
