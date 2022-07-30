import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  username: string;
  password: string;
  loading: any;

  constructor(private navCtrl: NavController, private local: Storage, private navParams: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authService: Auth, private alertCtrl: AlertController) {}

  login(){
        this.showLoader();

        if (!this.username || !this.password){

          this.loading.dismiss();
          this.showAlert('Inválido!', 'Preencha todos os campos.');

        }else{

          let dados = {
              username: this.username,
              password: this.password
            };

          this.authService.login(dados).then(
            result => {
              if (result['nome'] && result['id']){
                this.loading.dismiss();
                this.local.set("username", this.username);
                this.local.set("nome", result['nome']);
                this.local.set("id", result['id']);
                this.showToast('Autenticado com sucesso.', 'bottom', 2000);
                this.navCtrl.setRoot(TabsPage);

              }else{
                this.loading.dismiss();
                this.showAlert('Não foi possível autenticar!',result);
              }
              },

            err => {
              this.loading.dismiss();
              console.log("LOGIN, erro --> " + err);
              this.showAlert('Erro!', 'Problema interno do servidor. Tente mais tarde.');
              }
          );
        }
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({content: 'Aguarde...'});
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

    signin() {
      this.navCtrl.push(RegisterPage);
    }

}
