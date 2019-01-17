import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MacroPage } from '../macro/macro';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

/**
 * Generated class for the EducationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-education',
  templateUrl: 'education.html',
})
export class EducationPage {

	articles: AfoListObservable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: AngularFireDatabase,
    private offlineDB: AngularFireOfflineDatabase ) {
  	this.articles = this.offlineDB.list('/education');

	  this.articles.subscribe((response) => {
	        console.log(response);
	      })

	        //this.tab1 = List1Page;
	        //this.tab2 = List2Page;

	  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EducationPage');
  }

  toArticlePage(article: any){

    this.navCtrl.push(MacroPage, { article: article });

    console.log("Clicked toArticlePage", article); 
    
  }

}
