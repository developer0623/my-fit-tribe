import { Component } from '@angular/core';
import { NavController, SegmentButton, LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { ScheduleService } from '../schedule/schedule.service';
import { ScheduleDetailsPage } from '../schedule-details/schedule-details';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'schedule-page',
  templateUrl: 'schedule.html'
})
export class LiveFeedPage {
  segment: string;
  schedule: any;
  loading: any;
  importantDates: FirebaseListObservable<any>;

  constructor(
    public nav: NavController,
    public scheduleService: ScheduleService,
    public loadingCtrl: LoadingController,
    db: AngularFireDatabase
  ) {
    this.segment = "today";
    this.loading = this.loadingCtrl.create();
    this.importantDates = db.list('/important-dates', {
      query: {
        orderByChild: 'list',
        equalTo: 'live feed'
      }
    });
  }

  addImportantDate(){
    this.scheduleService.addItem();

    // items.push({ name: newName });
  }

  toDetailsPage(scheduleEvent){
    this.nav.push(ScheduleDetailsPage, {
      schedule: scheduleEvent
    });
  }

  ionViewDidLoad() {
    this.loading.present();
    this.loading.dismiss();
    /*
    this.scheduleService
      .getData()
      .then(data => {
        this.schedule.today = data.today;
        this.schedule.upcoming = data.upcoming;
        this.loading.dismiss();
      });
      */
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

}
