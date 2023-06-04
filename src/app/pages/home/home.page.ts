import { Component, ViewChild } from '@angular/core';
import { defaultAppConfigs } from '../../services/config';

import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { CategoriesService } from '../../services/categories.service';

import { UsersService } from '../../services/users.service';
import { PostsService } from '../../services/posts.service';
import { MediaService } from '../../services/media.service';
import { BookmarksService } from '../../services/bookmarks.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

import { IntroPagePage } from '../../pages/intro-page/intro-page.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  categories: any = [];
  posts: any = [];
  postsRecentNews: any = [];
  selectedCategory: any;
  selectedItem: any;
  postPageLoaded = 1;
  loading = true;

  emptyState = {
    "title": "Uups, no data!",
    "subtitle": "Sorry no posts here"
  }

  sliderConfig = {
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: true
};

  constructor(
    private postService: PostsService,
    private bookmarkService: BookmarksService,
    private mediaService: MediaService,
    private categoryService: CategoriesService,
    public navCtrl: NavController,
    private modalController: ModalController,
    private domSanitizer: DomSanitizer
  ) {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories
      if (categories) {
        this.refreshData(categories[0]);
        console.log("Cats: ", categories);
      }
    });

    if (this.isWizardShown()) {
      this.openModalWizard();
    }
  }


  
  textToHtml = (value) => {
    return this.domSanitizer.bypassSecurityTrustHtml(value)
  }

  
  isWizardShown() {
    return defaultAppConfigs.introData && !localStorage.getItem("SHOW_START_WIZARD");
  }

  getHtmlTitle(title) {
    if (title) {
      return this.domSanitizer.bypassSecurityTrustHtml(title)
    }
  }

  
  loadData(categoryId, event) {
    if (defaultAppConfigs.isFeaturesPostsGetFromSticky) {
      this.loadDataStickyFeatured(categoryId, event);
      this.loadDataStickyRecent(categoryId, event);
    } else {
      this.loadPostsAll(categoryId, event);
    }
  }
  
  loadPostsAll(categoryId, event) {
    this.postService.getPostListWithFilter(categoryId, null, null, null, this.postPageLoaded++).subscribe((data: Array<any>) => {
      if (this.posts && this.posts.length == 0) {
        this.posts = data.slice(0, defaultAppConfigs.numberOfItemForSlider);
        if (data.length > defaultAppConfigs.numberOfItemForSlider) {
            this.postsRecentNews = this.postsRecentNews.concat(data.slice(defaultAppConfigs.numberOfItemForSlider, data.length));
        }
      } else {
        this.postsRecentNews = this.postsRecentNews.concat(data);
      }

      this.posts.forEach(element => {
        element.bookmark = this.bookmarkService[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.posts.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          });
        }
      });

      this.postsRecentNews.forEach(element => {
        element.bookmark = this.bookmarkService[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.postsRecentNews.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          });
        }
      });
      this.loading = false;
      if (event) {
        event.target.complete();
      }
    })
  }

  
  loadDataStickyRecent(categoryId, event) {
    this.postService.getPostListWithFilter(categoryId, null, false, null, this.postPageLoaded++).subscribe((data: Array<any>) => {
      this.postsRecentNews = this.postsRecentNews.concat(data)
      if (event) {
        event.target.complete();
      }
      this.postsRecentNews.forEach(element => {
        element.bookmark = this.bookmarkService[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.postsRecentNews.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          });
        }
      });
      this.loading = false;
    });
  }

  loadDataStickyFeatured(categoryId, event) {
    this.postService.getPostListWithFilter(categoryId, null, true, null, this.postPageLoaded).subscribe((data: Array<any>) => {
      this.posts = this.posts.concat(data)
      if (event) {
        event.target.complete();
      }
      this.posts.forEach(element => {
        element.bookmark = this.bookmarkService[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.posts.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          });
        }
      });
      this.loading = false;
    });
  }
  
  refreshData(category) {
    if (category) {
      this.loading = true;
      this.selectedItem = category.name;
      this.selectedCategory = category;
      this.postsRecentNews = [];
      this.posts = [];
      this.postPageLoaded = 1;
      this.loadData(category.id, null);
    }
  }

  
  doInfinite(event) {
    this.loadData(this.selectedCategory.id, event);
  }

  openViewAll(isFeatured, event) {
    if (event) {
      event.stopPropagation();
    }
    const navigationExtras: NavigationExtras = {
      queryParams: { featured: isFeatured, categoryId: this.categories[0].id}
    };
    this.navCtrl.navigateForward(['/recent-news'], navigationExtras);
  }

  openSinglePost(item) {
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    this.navCtrl.navigateForward(['/single-page'], navigationExtras);
  }

  bookmark = (item, e) => {
    if (e) {
      e.stopPropagation();
    }
    if (item.bookmark) {
      item.bookmark = false;
      this.bookmarkService.delete(item);
    } else {
      item.bookmark = true;
      this.bookmarkService.save(item);
    }
  }

  isEmptyStateActive() {
    return !this.loading && this.posts.length == 0 && this.postsRecentNews.length == 0
  }

  initialLoading() {
    return this.loading
  }

  async openModalWizard() {
    let modal = await this.modalController.create({component: IntroPagePage});
     return await modal.present();
  }

}
