import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;


  constructor(platform: Platform, local: Storage) {
    local.get("username").then( result => {
      if (typeof(result) === "string" && result !== ""){
        this.rootPage = TabsPage;
      } else{

        this.rootPage = LoginPage;
      }
      platform.ready().then(() => {
        // Okay, so the platform is ready and our fplugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
      });
    });

  }
}
