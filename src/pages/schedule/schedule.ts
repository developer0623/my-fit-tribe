import { Component } from '@angular/core';
import { NavController, SegmentButton, LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { ScheduleService } from './schedule.service';
import { ScheduleDetailsPage } from '../schedule-details/schedule-details';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'schedule-page',
  templateUrl: 'schedule.html'
})

export class SchedulePage {
  segment: string;
  schedule: any;
  loading: any;
  workshopDates: FirebaseListObservable<any>;
  scanDates: FirebaseListObservable<any>;
  hiitDates: FirebaseListObservable<any>;

  constructor(
    public nav: NavController,
    public scheduleService: ScheduleService,
    public loadingCtrl: LoadingController,
    db: AngularFireDatabase
  ) {
    this.segment = "workshop";
    this.loading = this.loadingCtrl.create();
    this.workshopDates = this.scheduleService.getList('workshop');
    this.scanDates = this.scheduleService.getList('scan');
    this.hiitDates = this.scheduleService.getList('hiit');

    this.workshopDates.subscribe((response) => {
      console.log('workshop dates in');
      console.log(response);
    })
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
