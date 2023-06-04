import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { defaultAppConfigs } from 'src/app/services/config';

@Component({
  selector: 'app-recent-news',
  templateUrl: './recent-news.page.html',
  styleUrls: ['./recent-news.page.scss'],
})
export class RecentNewsPage {

  title: any = 'Recent post';
  categoryId:any;
  tagId: any;
  featured: any;
  searchText = "";
  isStickyEnabled = defaultAppConfigs.isFeaturesPostsGetFromSticky;
  isSearchActive = false;
  doRefresherEvent = null;
  @ViewChild('newsListSticky', {static: false}) newsListSticky;
  @ViewChild('newsList', {static: false}) newsList;

  constructor(public navCtrl: NavController, private route: ActivatedRoute) {
      let self = this;
      this.route.queryParams.subscribe(params => {
        if (params['categoryId']) {
          self.categoryId = params['categoryId']
        }
        if (params['tagId']) {
          self.tagId = params['tagId'];
        }
        if (params['featured']) {
          self.featured = params['featured'];
          if (self.featured == 'true') {
            self.title = 'Features post'
          } else {
            self.title = 'Recent post'
          }
        }
      });
  }

  setSearchActive(isSearchActive, event) {
    this.searchText = ""
    this.isSearchActive = isSearchActive
  }

  doRefresh(event) {
    this.doRefresherEvent = event;
    if (this.isStickyEnabled) {
      this.newsListSticky.doInfinite();
    } else {
      this.newsList.doInfinite();
    }
  }

  onRefreshCompleted() {
    if (this.doRefresherEvent != null) {
      this.doRefresherEvent.target.complete();
      this.doRefresherEvent = null;
    }
  }
}
