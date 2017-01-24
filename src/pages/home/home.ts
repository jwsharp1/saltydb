import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BanService } from '../../providers/ban-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BanService]
})

export class HomePage {
  public people: any;

  constructor(public navCtrl: NavController,
              public banServ: BanService,
              public alertCtrl: AlertController) {
    this.loadUsers();
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Enter cheater\'s ID',
      inputs: [
        {
          name: 'cheater_id',
          placeholder: 'ID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  loadUsers(){
  this.banServ.load()
  .then(data => {
    this.people = data;
  });
}

}
