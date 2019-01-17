import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScheduleDetailsModel } from './schedule-details.model';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the ScheduleDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-schedule-details',
  templateUrl: 'schedule-details.html',
})
export class ScheduleDetailsPage {

importantDate: any;
fxkeys: Array<any>;
fxImages: FirebaseListObservable<any>;
contact: ScheduleDetailsModel = new ScheduleDetailsModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
  		this.importantDate = navParams.get('schedule');
     	// let name = navParams.get('name');
     	this.fxImages = this.db.list('/important-dates/' + this.importantDate.$key + '/images');

     	this.fxImages.subscribe((response) => {
     		console.log(this.fxImages);
     	})



     	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleDetailsPage');
  }

}
