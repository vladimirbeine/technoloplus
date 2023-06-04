import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentNewsPageRoutingModule } from './recent-news-routing.module';

import { RecentNewsPage } from './recent-news.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentNewsPageRoutingModule,
    SharedModule
  ],
  declarations: [RecentNewsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecentNewsPageModule {}
