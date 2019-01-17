import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, SegmentButton } from 'ionic-angular';
import { ListingModel } from '../listing/listing.model';
import { List1Page } from '../list-1/list-1'; // big
import { List2Page } from '../list-2/list-2'; // small
import { ListingPage } from '../listing/listing';
import { VideoPage } from '../video/video';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

/**
 * Generated class for the TrainingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trainings',
  templateUrl: 'trainings.html',
})
export class TrainingsPage {
listing: ListingModel = new ListingModel();

tab1: any;
tab2: any;

segment: string;

workoutVideos: AfoListObservable<any[]>;
mindsetVideos: AfoListObservable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: AngularFireDatabase, 
    private offlineDB: AngularFireOfflineDatabase ) {
  this.segment = "workout";

  this.workoutVideos = this.offlineDB.list('/training-videos/workouts-lean');
  this.mindsetVideos = this.offlineDB.list('/training-videos/mindset');

  this.workoutVideos.subscribe((response) => {
        console.log(response);
      })

        this.tab1 = List1Page;
        this.tab2 = List2Page;

  }

  toVideoPage(video: any, category: string){
    this.navCtrl.push(VideoPage, {
      video: video,
      cat: category
    });
  }

  toWorkoutsPage(){
    this.navCtrl.push(ListingPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingsPage');
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    this.segment = segmentButton.value; // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    this.segment = segmentButton.value;
    // console.log('Segment selected', segmentButton.value);
  }

}
