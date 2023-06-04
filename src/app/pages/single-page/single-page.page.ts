import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, IonContent } from '@ionic/angular';
import { CommentsService } from '../../services/comments.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BookmarksService } from '../../services/bookmarks.service';
import { TagsService } from '../../services/tags.service'
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { defaultAppConfigs } from 'src/app/services/config';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.page.html',
  styleUrls: ['./single-page.page.scss'],
})
export class SinglePagePage {

  active: boolean;
  numberOfComment: Number = 0;
  post: any;
  htmlContent: any;
  htmlTitle:any;
  @ViewChild(IonContent, {static: false}) content: IonContent;

  constructor(public navCtrl: NavController,
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private CommentsService: CommentsService,
    private tagsService: TagsService,
    private bookmarkService: BookmarksService
    ) {
    let self = this;
    this.route.queryParams.subscribe(params => {
      self.post = JSON.parse(params['item']);
      self.post.tagsList = []
      if (self.post) {

      }
      if ( self.post.content) {
        self.htmlContent = self.domSanitizer.bypassSecurityTrustHtml(self.post.content)
      }
      if (self.post && self.post.title) {
        self.htmlTitle = self.domSanitizer.bypassSecurityTrustHtml(self.post.title);
      }
      if (self.post.tags) {
        self.post.tags.forEach(element => {
          self.tagsService.getItemById(element).subscribe(value => {
            self.post.tagsList.push(value)
          })
        });
      }

      self.CommentsService
        .getAllCommentsForPostById(self.post.id, 1)
        .subscribe((comments: Array<any>) => {
          self.numberOfComment = comments.length;
          self.post.comments = comments;
        });
    });
    this.incrementPostCounter();
    this.showAdsAfterXPosts();
  }

  openHashtag(tag, event) {
    if (event) {
      event.stopPropagation();
    }
    const navigationExtras: NavigationExtras = {
      queryParams: { tagId: JSON.stringify(tag.id) }
    };
    this.navCtrl.navigateForward(['/recent-news'], navigationExtras);
  }

  incrementPostCounter() {
    let counter = 0;
    if (localStorage.getItem('post-counter')) {
      counter = parseInt(localStorage.getItem('post-counter'));
    }
    counter++;
    localStorage.setItem('post-counter', counter + "");
  }

  showAdsAfterXPosts() {
    let counter = 0;
    if (localStorage.getItem('post-counter')) {
      counter = parseInt(localStorage.getItem('post-counter'));
    }
    if (defaultAppConfigs.interstitialAds.showAdsAfterXPosts <= counter) {
      this.showInterstitialAds()
      localStorage.setItem('post-counter', "0");
    }
  }

  showInterstitialAds() {
    if (!defaultAppConfigs.interstitialAds.enable) {
      return;
    }
  }

  openComment(item, event) {
    if (event) {
      event.stopPropagation();
    }
    const navigationExtras: NavigationExtras = {
      queryParams: { postId: JSON.stringify(this.post.id) }
    };
    this.navCtrl.navigateForward(['/form-page'], navigationExtras);
  }

  openCommentList(item, e) {
    if (e) {
      e.stopPropagation();
    }
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    this.navCtrl.navigateForward(['/comment-page'], navigationExtras);
  }

  isClassActive() {
    return this.active;
  }

  setClassActive(newValue) {
    if (this.active != newValue) {
      this._ngZone.run(() => {
        this.active = newValue;
      });
    }
  }

  share= (item, e) => {
    console.log("Share item: ", item, "Share event: ", e);
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

  onItemClick(item) {
    this.content.scrollToTop(200)
  }

  ionViewDidLeave() {
    Array
     .prototype.slice
     .call(document.getElementsByTagName('video'))
     .forEach(video => video.pause());
 }

 isCommentEnabled(post) {
  return post.comment_status == 'open'
 }

  subscribeToIonScroll() { }
}
