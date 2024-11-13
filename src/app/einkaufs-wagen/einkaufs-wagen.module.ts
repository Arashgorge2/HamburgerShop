import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EinkaufsWagenPageRoutingModule } from './einkaufs-wagen-routing.module';

import { EinkaufsWagenPage } from './einkaufs-wagen.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EinkaufsWagenPageRoutingModule,
    HttpClientModule
  ],
  declarations: [EinkaufsWagenPage]
})
export class EinkaufsWagenPageModule {}
