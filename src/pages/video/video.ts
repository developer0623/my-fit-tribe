import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

/**
 * Generated class for the VideoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  video: any;
  category: string;
	ytSettings: string;
	exercises: AfoListObservable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: AngularFireDatabase,
    private offlineDB: AngularFireOfflineDatabase ) {
    this.video = navParams.get('video');
  	this.category = navParams.get('cat');
    this.ytSettings = this.video.yt_embed + '?showinfo=0';
    this.exercises = this.offlineDB.list('/training-videos/' + this.category + '/' + this.video.$key + '/exercises');

	this.exercises.subscribe((response) => {
        console.log(response);
     		console.log(this.ytSettings);
     	});
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

}
