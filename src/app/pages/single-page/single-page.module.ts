import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePagePageRoutingModule } from './single-page-routing.module';

import { SinglePagePage } from './single-page.page';
import { CommentsService } from 'src/app/services/comments.service';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { TagsService } from 'src/app/services/tags.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SinglePagePageRoutingModule,
    HttpClientModule
  ],
  declarations: [SinglePagePage],
  providers: [
    CommentsService,
    BookmarksService,
    TagsService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SinglePagePageModule {}
