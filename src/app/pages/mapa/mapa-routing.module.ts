import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapaComponent } from './mapa.component';

const routes: Routes = [
  {
    path: '', 
    children: [
      { path: '', component: MapaComponent },
      { path: '**', redirectTo: 'mapa' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaRoutingModule { }
