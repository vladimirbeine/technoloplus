import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroPagePageRoutingModule } from './intro-page-routing.module';

import { IntroPagePage } from './intro-page.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPagePageRoutingModule,
    SharedModule
  ],
  declarations: [IntroPagePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPagePageModule {}
