import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BookmarksService } from 'src/app/services/bookmarks.service';

@Component({
  selector: 'app-news-item-home',
  templateUrl: './news-item-home.component.html',
  styleUrls: ['./news-item-home.component.scss'],
})
export class NewsItemHomeComponent {

  @Input('data') data: any;

  constructor(
    private navCtrl: NavController, 
    private domSanitizer: DomSanitizer, 
    private bookmarksService: BookmarksService) {
      
      console.log("News Item Home: ", this.data);
    }

  bookmark = (item, event) => {
    if (event) {
      event.stopPropagation();
    }
    if (item.bookmark) {
      item.bookmark = false;
      this.bookmarksService.delete(item);
    } else {
      item.bookmark = true;
      this.bookmarksService.save(item);
    }
  }

  textToHtml = (value) => {
    return this.domSanitizer.bypassSecurityTrustHtml(value)
  }

  openSinglePost(item) {
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    this.navCtrl.navigateForward(['/single-page'], navigationExtras);
  }
}
