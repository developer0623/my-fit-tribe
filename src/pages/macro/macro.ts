import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MacroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-macro',
  templateUrl: 'macro.html',
})
export class MacroPage {
	article: any;
	
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.article = navParams.get('article');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MacroPage');
  }

}
