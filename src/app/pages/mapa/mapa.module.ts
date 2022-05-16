import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MapaRoutingModule } from './mapa-routing.module';
import { MapaComponent } from './mapa.component';
import { PipesModule } from '../../shared/pipes/pipes.module';


@NgModule({
  declarations: [
    MapaComponent
  ],
  imports: [
    CommonModule,
    MapaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class MapaModule { }
