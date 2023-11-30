import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OvernightLogPage } from './overnight-log.page';

const routes: Routes = [
  {
    path: '',
    component: OvernightLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OvernightLogPageRoutingModule {}
