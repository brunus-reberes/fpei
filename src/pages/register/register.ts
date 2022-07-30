import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  name: string;
  username: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {}


  register(){

    this.showLoader();
    if (!this.name || !this.username || !this.password){

      this.showAlert('Inválido!', 'Preencha todos os campos.');

    }else{

      let dados = {
          name: this.name,
          username: this.username,
          password: this.password
        };

        this.authService.createAccount(dados).then(
          result => {
            if(!result['sucesso']){
              this.showAlert("Não foi possível autenticar!", result);
            }else{
              this.showToast('Conta criada com sucesso!', 'middle');
              this.navCtrl.setRoot(LoginPage);
            }
          },
          err => {  console.log("REGISTO - erro --> " + err);  });
    }

    this.loading.dismiss();
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'A registar...'
    });

    this.loading.present();

  }

  showAlert(title, subtitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [{
        text: 'Ok'
      }]
    });
    alert.present();
  }

  showToast(message, position) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position,
    });
    toast.present();
  }
}
