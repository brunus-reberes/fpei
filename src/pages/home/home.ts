import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, App, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import 'moment/locale/pt';

import { Planificacoes } from '../../providers/planificacoes';

import { PlanPage } from '../plan/plan';
import { VistaDiariaPage } from '../vista-diaria/vista-diaria';
import { PlanificacaoPage } from '../planificacao/planificacao';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locale = moment.locale("pt");
  planificacoes: any;
  loading: any;
  mes: any;
  seg: any;
  ter: any;
  qua: any;
  qui: any;
  sex: any;
  segunda_manha = [];
  terca_manha = [];
  quarta_manha = [];
  quinta_manha = [];
  sexta_manha = [];
  segunda_tarde = [];
  terca_tarde = [];
  quarta_tarde = [];
  quinta_tarde = [];
  sexta_tarde = [];
  Segunda: string;
  Terca: string;
  Quarta: string;
  Quinta: string;
  Sexta: string;
  dia_Segunda: string;
  dia_Terca: string;
  dia_Quarta: string;
  dia_Quinta: string;
  dia_Sexta: string;
  bool: boolean = false;
  user: string;

  constructor(private local: Storage,private toastCtrl: ToastController, private navCtrl: NavController, private planService: Planificacoes,private app: App, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  ionViewDidEnter(){
    if (this.bool == true){
      this.showLoader();
      this.getPlan();
    }else{
      this.showLoader();
      this.semana_atual();
      this.getPlan();
      this.bool = true;
    }
      this.loading.dismiss();
  }

  semana_seguinte(){
    this.showLoader();
    this.seg = moment(this.seg).add(1,"weeks").format("YYYY-MM-DD");
    this.ter = moment(this.ter).add(1,"weeks").format("YYYY-MM-DD");
    this.qua = moment(this.qua).add(1,"weeks").format("YYYY-MM-DD");
    this.qui = moment(this.qui).add(1,"weeks").format("YYYY-MM-DD");
    this.sex = moment(this.sex).add(1,"weeks").format("YYYY-MM-DD");
    if (moment(this.seg).format("MM") !== moment(this.sex).format("MM")){
      this.mes = moment(this.seg).format("MMM") + "-" + moment(this.sex).format("MMM")
    }else{
      this.mes = moment(this.seg).format("MMMM")
    }
    this.procurar_planificacao();
    this.Segunda = moment(this.seg).format('dddd').slice(0,7);
    this.Terca = moment(this.ter).format('dddd').slice(0,5);
    this.Quarta = moment(this.qua).format('dddd').slice(0,6);
    this.Quinta = moment(this.qui).format('dddd').slice(0,6);
    this.Sexta = moment(this.sex).format('dddd').slice(0,5);
    this.dia_Segunda = moment(this.seg).format('DD');
    this.dia_Terca = moment(this.ter).format('DD');
    this.dia_Quarta = moment(this.qua).format('DD');
    this.dia_Quinta = moment(this.qui).format('DD');
    this.dia_Sexta = moment(this.sex).format('DD');
    this.loading.dismiss();
  }

  semana_anterior(){
    this.showLoader();
    this.seg = moment(this.seg).subtract(1,"weeks").format("YYYY-MM-DD");
    this.ter = moment(this.ter).subtract(1,"weeks").format("YYYY-MM-DD");
    this.qua = moment(this.qua).subtract(1,"weeks").format("YYYY-MM-DD");
    this.qui = moment(this.qui).subtract(1,"weeks").format("YYYY-MM-DD");
    this.sex = moment(this.sex).subtract(1,"weeks").format("YYYY-MM-DD");
    if (moment(this.seg).format("MM") !== moment(this.sex).format("MM")){
      this.mes = moment(this.seg).format("MMM") + "-" + moment(this.sex).format("MMM")
    }else{
      this.mes = moment(this.seg).format("MMMM")
    }
    this.procurar_planificacao();
    this.Segunda = moment(this.seg).format('dddd').slice(0,7);
    this.Terca = moment(this.ter).format('dddd').slice(0,5);
    this.Quarta = moment(this.qua).format('dddd').slice(0,6);
    this.Quinta = moment(this.qui).format('dddd').slice(0,6);
    this.Sexta = moment(this.sex).format('dddd').slice(0,5);
    this.dia_Segunda = moment(this.seg).format('DD');
    this.dia_Terca = moment(this.ter).format('DD');
    this.dia_Quarta = moment(this.qua).format('DD');
    this.dia_Quinta = moment(this.qui).format('DD');
    this.dia_Sexta = moment(this.sex).format('DD');
    this.loading.dismiss();
  }

  semana_atual(){
    if (moment(this.seg).format("MM") !== moment(this.sex).format("MM")){
      this.mes = moment(this.seg).format("MMM") + "-" + moment(this.sex).format("MMM")
    }else{
      this.mes = moment(this.seg).format("MMMM")
    }
    switch (moment().format("ddd")){
      case "Dom":
            this.seg = moment().add(1,"days").format("YYYY-MM-DD");
            this.ter = moment().add(2,"days").format("YYYY-MM-DD");
            this.qua = moment().add(3,"days").format("YYYY-MM-DD");
            this.qui = moment().add(4,"days").format("YYYY-MM-DD");
            this.sex = moment().add(5,"days").format("YYYY-MM-DD");
            break;
       case "Seg":
             this.seg = moment().format("YYYY-MM-DD");
             this.ter = moment().add(1,"days").format("YYYY-MM-DD");
             this.qua = moment().add(2,"days").format("YYYY-MM-DD");
             this.qui = moment().add(3,"days").format("YYYY-MM-DD");
             this.sex = moment().add(4,"days").format("YYYY-MM-DD");
             break;
       case "Ter":
             this.seg = moment().subtract(1,"days").format("YYYY-MM-DD");
             this.ter = moment().format("YYYY-MM-DD");
             this.qua = moment().add(1,"days").format("YYYY-MM-DD");
             this.qui = moment().add(2,"days").format("YYYY-MM-DD");
             this.sex = moment().add(3,"days").format("YYYY-MM-DD");
             break;
       case "Qua":
             this.seg = moment().subtract(2,"days").format("YYYY-MM-DD");
             this.ter = moment().subtract(1,"days").format("YYYY-MM-DD");
             this.qua = moment().format("YYYY-MM-DD");
             this.qui = moment().add(1,"days").format("YYYY-MM-DD");
             this.sex = moment().add(2,"days").format("YYYY-MM-DD");
             break;
       case "Qui":
             this.seg = moment().subtract(3,"days").format("YYYY-MM-DD");
             this.ter = moment().subtract(2,"days").format("YYYY-MM-DD");
             this.qua = moment().subtract(1,"days").format("YYYY-MM-DD");
             this.qui = moment().format("YYYY-MM-DD");
             this.sex = moment().add(1,"days").format("YYYY-MM-DD");
             break;
       case "Sex":
             this.seg = moment().subtract(4,"days").format("YYYY-MM-DD");
             this.ter = moment().subtract(3,"days").format("YYYY-MM-DD");
             this.qua = moment().subtract(2,"days").format("YYYY-MM-DD");
             this.qui = moment().subtract(1,"days").format("YYYY-MM-DD");
             this.sex = moment().format("YYYY-MM-DD");
             break;
       case "Sáb":
             this.seg = moment().add(2,"days").format("YYYY-MM-DD");
             this.ter = moment().add(3,"days").format("YYYY-MM-DD");
             this.qua = moment().add(4,"days").format("YYYY-MM-DD");
             this.qui = moment().add(5,"days").format("YYYY-MM-DD");
             this.sex = moment().add(6,"days").format("YYYY-MM-DD");
             break;

    }
    this.Segunda = moment(this.seg).format('dddd').slice(0,7);
    this.Terca = moment(this.ter).format('dddd').slice(0,5);
    this.Quarta = moment(this.qua).format('dddd').slice(0,6);
    this.Quinta = moment(this.qui).format('dddd').slice(0,6);
    this.Sexta = moment(this.sex).format('dddd').slice(0,5);
    this.dia_Segunda = moment(this.seg).format('DD');
    this.dia_Terca = moment(this.ter).format('DD');
    this.dia_Quarta = moment(this.qua).format('DD');
    this.dia_Quinta = moment(this.qui).format('DD');
    this.dia_Sexta = moment(this.sex).format('DD');
  }

  procurar_planificacao(){

    let hora_almoco = "12:00";

    this.segunda_manha = [];
    this.terca_manha = [];
    this.quarta_manha = [];
    this.quinta_manha = [];
    this.sexta_manha = [];
    this.segunda_tarde = [];
    this.terca_tarde = [];
    this.quarta_tarde = [];
    this.quinta_tarde = [];
    this.sexta_tarde = [];

    for (let _i of this.planificacoes){
      _i.horario_inicio = moment(_i.horario_inicio, "HH:mm:ss").format('HH:mm');
      switch (_i.data_planificacao){

          case this.seg:
          if (_i.horario_inicio < hora_almoco){
              this.segunda_manha.push(_i);
          }else{
              this.segunda_tarde.push(_i);
          }
          break;

          case this.ter:
          if (_i.horario_inicio < hora_almoco){
              this.terca_manha.push(_i);
          }else{
              this.terca_tarde.push(_i);
          }
          break;

          case this.qua:
          if (_i.horario_inicio < hora_almoco){
              this.quarta_manha.push(_i);
          }else{
              this.quarta_tarde.push(_i);
          }
          break;

          case this.qui:
          if (_i.horario_inicio < hora_almoco){
              this.quinta_manha.push(_i);
          }else{
              this.quinta_tarde.push(_i);
          }
          break;

          case this.sex:
          if (_i.horario_inicio < hora_almoco){
              this.sexta_manha.push(_i);
          }else{
              this.sexta_tarde.push(_i);
          }
          break;

      }
    }
    if (this.segunda_manha.length == 0 && this.segunda_tarde.length == 0 && this.terca_manha.length == 0 && this.terca_tarde.length == 0 && this.quarta_manha.length == 0 && this.quarta_tarde.length == 0 && this.quinta_manha.length == 0 && this.quinta_tarde.length == 0 && this.sexta_manha.length == 0 && this.sexta_tarde.length == 0){
        this.showToast('Não existem planificações.', 'middle', 1500);
    }

  }

  getPlan(){
    this.local.get("username").then( res => {
      this.user = res;
      let credentials = {
        username: this.user
      }

      this.planService.getPlanificacoes(credentials).then(
        result => {
          if (!result['data']){
            this.showAlert('Ocurreu um problema!', result);
            if (result == 'Utilizador não autenticado.'){
              this.local.set("username", "");
              this.app.getRootNav().setRoot(LoginPage);
            }
          }else{
            this.planificacoes = result["data"];
            if (this.planificacoes.length == 0){
              this.showToast('Não existem planificações.', 'middle', 1500);
            }else{
              this.procurar_planificacao();
            }
          }
          },
        err=>{
          console.log("PLANIFICACOES, erro --> " + err);
          this.showAlert('Erro!', 'Problema interno do servidor. Tente mais tarde.');
          }
      );
    });
  }

  vista_diaria(dia, planificacoes){
    this.navCtrl.push(VistaDiariaPage, {
        dia: dia,
        planificacoes: planificacoes
    });
  }

  openAtividade(planificacao){
    this.navCtrl.push(PlanificacaoPage, {
      planificacao: planificacao
    });
  }

  addPlan(){
    this.navCtrl.push(PlanPage);
  }

 showLoader(){
   this.loading = this.loadingCtrl.create({
     content: 'Aguarde...'
   });
   this.loading.present();

 }

 showAlert(title, subtitle){
   let alert = this.alertCtrl.create({
     title: title,
     subTitle: subtitle,
     buttons: [{text: 'Ok'}]
   });
   alert.present();
 }

 showToast(message, position, sec) {
   let toast = this.toastCtrl.create({
     message: message,
     duration: sec,
     position: position,
   });
   toast.present();
 }

}
