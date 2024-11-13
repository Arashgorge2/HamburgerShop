import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EinkaufsWagenPage } from './einkaufs-wagen.page';

const routes: Routes = [
  {
    path: '',
    component: EinkaufsWagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EinkaufsWagenPageRoutingModule {}
