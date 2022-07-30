import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Planificacoes } from '../../providers/planificacoes';
import * as moment from 'moment';
import 'moment/locale/pt';


@Component({
  selector: 'page-planificacao',
  templateUrl: 'planificacao.html'
})
export class PlanificacaoPage {

  planificacao: any;
  data: string;
  show: boolean = true;
  plano = {};
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public planService: Planificacoes, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.planificacao = navParams.get("planificacao");
  }

  ionViewDidLoad() {
    if (typeof this.planificacao.areas_curriculares === "string"){
      this.planificacao.areas_curriculares = this.planificacao.areas_curriculares.split(",");
    }
    this.data = moment(this.planificacao.data_planificacao).format("ddd, DD MMM YYYY");
    this.plano = this.planificacao;

  }

  deletePlan(){
    this.showLoader();
    this.planService.deletePlanificacao(this.plano['id_plan']).then((result) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Planificação eliminada com sucesso!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        });
        alert.present();
        this.navCtrl.pop();
      }, (err) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Não foi possível eliminar a planificacao!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        });
        alert.present();
      });
  }

  editPlan(){
    this.showLoader();
    this.plano['id_user'] = 1;
    this.plano['areas_curriculares'] = this.plano['areas_curriculares'].toString();
    this.planService.editPlanificacao(this.plano, this.plano['id_plan']).then((result) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Planificação editada com sucesso!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        });
        alert.present();
        this.navCtrl.pop();
      }, (err) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Não foi possível editar a planificacao!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        });
        alert.present();
      });
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    this.loading.present();

  }

}
