import { Component } from '@angular/core';

import { IonicPage, NavController, SegmentButton, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { RecipePage } from '../recipe/recipe';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

/**
 * Generated class for the NutritionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nutrition',
  templateUrl: 'nutrition.html',
})
export class NutritionPage {

segment: string;
segmentDay: string;
orderedMonday: any;
recipes: AfoListObservable<any[]>;
mealGuides: AfoListObservable<any[]>;
checkboxTagsForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    db: AngularFireDatabase,
    private offlineDB: AngularFireOfflineDatabase ) {
  this.segment = "mealplan";
  this.segmentDay = "monday";

  this.recipes = this.offlineDB.list('/recipes-lean');
  this.mealGuides = this.offlineDB.list('/meal_guide');

  this.mealGuides.subscribe((response) => {
  	console.log(this.mealGuides);
    // this.orderedMonday = this.mealGuides
  });

	this.checkboxTagsForm = new FormGroup({
      tag_1: new FormControl(true),
      tag_2: new FormControl(true),
      tag_3: new FormControl(true),
      tag_4: new FormControl(true)
    });

  console.log(this.checkboxTagsForm);

}

toRecipePage(recipe: any){
  this.navCtrl.push(RecipePage, {
    recipe: recipe
  });
}

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NutritionPage');
  }

}
