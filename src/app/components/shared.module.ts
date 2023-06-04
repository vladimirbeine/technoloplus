import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsWizardComponent } from './news-wizard/news-wizard.component';
import { NewsLoadingComponent } from './news-loading/news-loading.component';
import { NewsItemHomeComponent } from './news-item-home/news-item-home.component';
import { NewsListComponent } from './news-list/news-list.component';



@NgModule({
  declarations: [
    NewsWizardComponent,
    NewsLoadingComponent,
    NewsItemHomeComponent,
    NewsListComponent
  ],
  exports: [
    NewsWizardComponent,
    NewsLoadingComponent,
    NewsItemHomeComponent,
    NewsListComponent
  ],
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
