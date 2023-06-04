import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinglePagePage } from './single-page.page';

const routes: Routes = [
  {
    path: '',
    component: SinglePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinglePagePageRoutingModule {}
