import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Planificacoes } from '../../providers/planificacoes';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import 'moment/locale/pt';

@Component({
  selector: 'page-estatisticas',
  templateUrl: 'estatisticas.html'
})
export class EstatisticasPage {

  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  mes: any;
  locale = moment.locale("pt");
  id: number;

  constructor(private navCtrl: NavController,private alertCtrl: AlertController, private planService: Planificacoes, private local: Storage) {

  }

  ionViewDidEnter(){

    this.mes = moment().format("MMMM");
    this.getAnalytics();

  }

  getAnalytics(){

    this.local.get("id").then(
      result => {
        this.id = result;
        console.log ("res recebeu -> " + result);

        let dados = {
          mes: moment(this.mes,"MMMM").format("MM"),
          id: this.id
        }
        this.planService.analyticsPlan(dados).then((dados)=>{
          let resposta = dados["data"];
          this.barChart = new Chart(this.barCanvas.nativeElement, {

                  type: 'bar',
                  data: {
                    labels: ["AFPS", "ACM", "EP", "EM", "ED", "EM","LO/EE","Mat","NT","FC"],
                    datasets: [{
                        label: '# de vezes trabalhado',
                        data: [resposta.area_formacao_pessoal_social, resposta.area_conhecimento_mundo, resposta.expressao_plastica, resposta.expressao_motora, resposta.expressao_dramatica, resposta.expressao_musical, resposta.linguagem_oral_expressao_escrita, resposta.matematica, resposta.novas_tecnologias, resposta.formacao_crista],
                        backgroundColor: [
                            'rgba(159, 64, 255, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 64, 65, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(64, 65, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(25, 63, 100, 1)',
                        ]
                    }]
                },
                  options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    legend: {
                      display: false
                    }
                }

          });
        },(err)=>{
              console.log("ESTATISTICAS, erro -> " + err);
              let alert = this.alertCtrl.create({
                title: 'Erro!',
                subTitle: 'Erro interno no servidor. Tente mais tarde.',
                buttons: [
                  {
                    text: 'Ok'
                  }
                ]
              });
              alert.present();
        });
      }
    );
  }

  mes_anterior(){
    this.mes = moment(this.mes, "MMMM").subtract(1, "months").format("MMMM");
    this.getAnalytics();
  }

  mes_seguinte(){
    this.mes = moment(this.mes, "MMMM").add(1, "months").format("MMMM");
    this.getAnalytics();
  }

}
