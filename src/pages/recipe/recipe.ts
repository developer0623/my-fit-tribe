import { Component, ViewChild } from '@angular/core';
import { IonicPage, SegmentButton, NavController, NavParams } from 'ionic-angular';
// import { Chart } from 'chart.js';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

/**
 * Generated class for the RecipePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

	@ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;
  recipe: any;
  ingredients: AfoListObservable<any[]>;
	specialIngredients: AfoListObservable<any[]>;

	// contact: ContactModel = new ContactModel();
	segment: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: AngularFireDatabase,
    private offlineDB: AngularFireOfflineDatabase ) {
  this.recipe = navParams.get('recipe');

  this.ingredients = this.offlineDB.list('/recipes/' + this.recipe.$key + '/ingredients');
  this.specialIngredients = this.offlineDB.list('/recipes/' + this.recipe.$key + '/special_ingredients');

      this.ingredients.subscribe((response) => {
        console.log(response);
      })

  this.segment = 'ingredients';
}

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');

    /*this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Carbs", "Protein", "Fat"],
                datasets: [{
                    label: 'Macros',
                    data: [40, 50, 10],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }
 
        });*/
  }

}
