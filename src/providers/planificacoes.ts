import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Planificacoes {

  API: string = "/api/planificacoes";
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});

  constructor(public http: Http) {
  }

  getPlanificacoes(credentials){

    return new Promise((resolve, reject) => {

        this.http.post(this.API, JSON.stringify(credentials), {headers: this.contentHeader})
          .map(res => res.json())
          .subscribe(
            dados => resolve(dados),
            err => reject(err)
          );
    });

  }

  createPlanificacoes(planificacao){

    return new Promise((resolve, reject) => {

      this.http.post(this.API + '/create', JSON.stringify(planificacao), {headers: this.contentHeader})
        .map(res => res.json())
        .subscribe(
          res => resolve(res),
          err => reject(err)
        );

    });

  }

  deletePlanificacao(id){

    return new Promise((resolve, reject) => {

      this.http.delete(this.API + '/delete/' + id, {headers: this.contentHeader})
        .subscribe(
          res => resolve(res),
          err => reject(err)
        );

    });

  }

  editPlanificacao(planificacao, id){

    return new Promise((resolve, reject) => {

      this.http.put(this.API + '/update/' + id, JSON.stringify(planificacao), {headers: this.contentHeader})
        .map(res => res.json())
        .subscribe(
          res => resolve(res),
          err => reject(err)
        );

    });

  }


  analyticsPlan(dados){
    return new Promise((resolve, reject) => {

      this.http.post(this.API + '/analytics', JSON.stringify(dados), {headers: this.contentHeader})
        .map(res => res.json())
        .subscribe(
          res => resolve(res),
          err => reject(err)
        );

    });
  }

}
