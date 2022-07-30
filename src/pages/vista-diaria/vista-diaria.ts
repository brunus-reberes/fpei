import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Auth } from '../../providers/auth';
import { Planificacoes } from '../../providers/planificacoes';
import { PlanificacaoPage } from '../planificacao/planificacao';
import * as moment from 'moment';
import 'moment/locale/pt';

@Component({
  selector: 'page-vista-diaria',
  templateUrl: 'vista-diaria.html'
})
export class VistaDiariaPage {

  locale = moment.locale("pt");
  loading: any;
  dia: string;
  planificacoes = [];
  plans = [];
  dia_semana: string;
  dia_dia: string;

  constructor(public http: Http, public authService: Auth, public planService: Planificacoes, public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navParams: NavParams) {
    this.dia = this.navParams.get('dia');
    this.planificacoes = this.navParams.get('planificacoes');
    console.log ("this.planificacoes typo -> " + typeof(this.dia));
  }

  ionViewDidLoad() {
    this.showLoader();
    this.dia_semana = moment(this.dia).format('dddd');
    this.dia_dia = moment(this.dia).format('DD-MM-YYYY');
    if (this.planificacoes !== undefined)
    for (let _i of this.planificacoes){
      if (_i.data_planificacao == moment(this.dia).format('YYYY-MM-DD')){
        this.plans.push(_i);
      }
    }
    this.loading.dismiss();
  }

  openPlanificacao(plan){
    this.navCtrl.push(PlanificacaoPage, {
      planificacao: plan
    });
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    this.loading.present();

  }

}
