import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-setings',
  templateUrl: 'setings.html'
})
export class SetingsPage {

  loading: any;
  nome: string;

  constructor(public navCtrl: NavController,public app: App,public loadingCtrl: LoadingController,public local: Storage, public navParams: NavParams) {}

  ionViewDidLoad(){
    this.local.get("nome").then(
      result => this.nome = result
    );
  }

  signout(){
    this.showLoader();
    this.local.clear().then(
      result => {
        this.loading.dismiss();
        this.app.getRootNav().setRoot(LoginPage);
      }
    );
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({content: 'Aguarde...'});
      this.loading.present();
  }

}
