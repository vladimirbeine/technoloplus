import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NewsWizardService } from 'src/app/services/news-wizard.service';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.page.html',
  styleUrls: ['./intro-page.page.scss'],
})
export class IntroPagePage {

  data = {};

  constructor(
      private modalController: ModalController,
      public navCtrl: NavController,
      private service: NewsWizardService) {
      this.data = this.service.getNewsWizardData()
  }

   closeModal() {
       localStorage.setItem("SHOW_START_WIZARD", 'true');
      this.modalController.dismiss();
  }
}
