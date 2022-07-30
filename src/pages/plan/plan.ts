import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import 'moment/locale/pt';

import { Planificacoes } from '../../providers/planificacoes';

@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html'
})
export class PlanPage {

  constructor(private toastCtrl: ToastController,private local: Storage,private navCtrl: NavController, private planService: Planificacoes, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {

  }

  plano = {
    data_planificacao: moment().format()
  };

  loading: any;

  addPlan(){

    this.showLoader();
    this.local.get("id").then(
      result => {
        this.plano['id_user'] = result;

        if (!this.plano['id_user'] || !this.plano['data_planificacao'] || !this.plano['horario_inicio'] || !this.plano['atividade_nome'] || !this.plano['atividade_descricao'] || !this.plano['intencoes_pedagogicas'] || !this.plano['areas_curriculares']){
          this.loading.dismiss();
          this.showAlert('Inválido!', 'Preencha todos os campos.');
        }else{

          this.plano['areas_curriculares'] = this.plano['areas_curriculares'].toString();

          this.planService.createPlanificacoes(this.plano).then((result) => {
              this.loading.dismiss();
              this.showToast('Planificação criada com sucesso!', 'middle', 1500);
              this.navCtrl.pop();
            }, (err) => {
              this.loading.dismiss();
              console.log("ADICIONAR, erro --> " + err);
              this.showAlert('Erro!', 'Problema interno do servidor. Tente mais tarde.');
              this.navCtrl.pop();
            });
        }
      }
    );
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
      buttons: [
        {
          text: 'Ok'
        }
      ]
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
