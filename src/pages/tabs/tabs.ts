import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { EstatisticasPage } from '../estatisticas/estatisticas';
import { SetingsPage } from '../setings/setings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = EstatisticasPage;
  tab3Root: any = SetingsPage;

  constructor() {

  }
}
