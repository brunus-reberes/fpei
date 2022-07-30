import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { EstatisticasPage } from '../pages/estatisticas/estatisticas';
import { PlanPage } from '../pages/plan/plan';
import { SetingsPage } from '../pages/setings/setings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { Auth } from '../providers/auth';
import { Planificacoes } from '../providers/planificacoes';
import { VistaDiariaPage } from '../pages/vista-diaria/vista-diaria';
import { PlanificacaoPage } from '../pages/planificacao/planificacao';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
    MyApp,
    EstatisticasPage,
    SetingsPage,
    HomePage,
    PlanPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    VistaDiariaPage,
    PlanificacaoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,//{backButtonText: 'Voltar'},
    {
  monthNames: ['Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro' ],
  monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez' ],
  dayNames: ['Domingo', 'Segunda-feira', 'Ter\u00e7a-feira', 'Quarta-feira','Quinta-feira','Sexta-feira','S\u00e1bado' ],
  dayShortNames: ['Dom', 'Seg', 'Ter', 'Qua','Qui','Sex','S\u00e1b' ],
}
  )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EstatisticasPage,
    SetingsPage,
    HomePage,
    PlanPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    VistaDiariaPage,
    PlanificacaoPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    Auth,
    Planificacoes,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AppModule {}
