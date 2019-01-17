import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Http } from '@angular/http';
import { App, Platform, NavController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';

import { FeedPage } from '../feed/feed';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';

import { ListingModel } from './listing.model';
import { ListingService } from './listing.service';
import { TrainingsPage } from '../trainings/trainings';
import { SchedulePage } from '../schedule/schedule';
import { LiveFeedPage } from '../live-feed/schedule';
import { NutritionPage } from '../nutrition/nutrition';
import { EducationPage } from '../education/education';
import { SubscriptionPage } from '../subscription/subscription';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';


@Component({
  selector: 'listing-page',
  templateUrl: 'listing.html',
})
export class ListingPage implements OnInit {
  listing: ListingModel = new ListingModel();
  comeon: any;
  loading: any;
  navigationList: any;
  navigationListLocal: any;
  navigationListFirebase: AfoListObservable<any[]>;

  registered: any;
  registeredDate: any;
  currentDate: any;
  timeDifference: any;

  trial: FirebaseObjectObservable<any>;
  trialRemaining: any;
  isTrial: any;

  verifyReceipt: Observable<any>;
  productOne: any;
  productId: any;

  constructor(
    public app: App,
    platform: Platform,
    public nav: NavController,
    public listingService: ListingService,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private device: Device,
    private http: Http,
    private offlineDB: AngularFireOfflineDatabase,
    private nativeStorage: NativeStorage,
    public store: InAppPurchase2
  ) {
    //let navs = this.app.getRootNav();
    this.loading = this.loadingCtrl.create();

    

    this.comeon = '';

    platform.ready().then(() => {
      this.productId = 'com.myfittribe.challenge.monthlysub';

         this.productOne = this.store.get(this.productId);
              console.log('product get', this.productOne);

              if(this.productOne.owned){
                    console.log('product owned');
                    // this.nav.setRoot(TabsNavigationPage);
                  } else {
                    console.log('product not owned')
                    // this.nav.setRoot(SubscriptionPage);
                  }
    });
  }

  ngOnInit(){
    
   this.navigationList = this.offlineDB.list('/navigation');
   this.navigationList.subscribe(result => {
    // this.loading.dismiss();
   })


   

   
    /*this.navigationList = this.listingService
      .getData()
      .then(data => {
        this.loading.dismiss();

        console.log('local data', this.navigationList);

        return data;        


      });*/

      /*
      this.navigationList = this.listingService.getData();
      this.navigationList.then(data => {
        this.loading.dismiss();
        // this.navigationList = data;
        // console.log('data', data);
        this.navigationListFirebase = this.offlineDB.list('/navigation');

        this.navigationListFirebase.subscribe( result => {
          console.log('firebase data', result[0]);
          // this.navigationList =
          this.navigationList = result[0];
        });
      });
      */

      
      /*this.navigationListLocal = this.http.get('./assets/example_data/listing.json')
      .toPromise()
      .then(response => {
        console.log('data', response.json());
        this.loading.dismiss();

        var returnData = response.json();        
        
        this.navigationList = returnData;        

        this.navigationListFirebase = this.offlineDB.list('/navigation');

        this.navigationListFirebase.subscribe( result => {
          console.log('firebase data', result);
          // this.navigationList = result;
        });

        return returnData;

      
      });*/

      


      

    /*

      this.navigationList = this.http.get('./assets/example_data/listing.json');
     .then(response => response.json())
     .catch(this.handleError);

     */

      
      
      /*this.navigationListFirebase = this.offlineDB.list('/navigation')
        .toPromise()
        .then(response => {
          console.log('firebase response', response);
          return response;
        });*/

      /*this.navigationListFirebase.subscribe( result => {
        this.navigationList = result;
      });*/
      

        /*
        this.navigationListFirebase.subscribe( result => {
          this.navigationList = result;
        });
        */
        
      

        

  }


  ionViewDidLoad() {
    // this.loading.present();
    /*
    this.navigationList
      .subscribe((response) => {
        this.loading.dismiss();
      });
      */
  }

  goToPage(page: any){
    let pageTitle = page.title;
    // let pageName = pageTitle + 'Page';

    if(pageTitle === 'Important Dates'){
      this.nav.push(SchedulePage, { page: page });
    } else if(pageTitle === 'Training'){
      this.nav.push(TrainingsPage, { page: page });
    } else if(pageTitle === 'Live Feed'){
      this.nav.push(LiveFeedPage, { page: page });
    } else if(pageTitle === 'Nutrition'){
      this.nav.push(NutritionPage, { page: page });
    } else if(pageTitle === 'Education'){
      this.nav.push(EducationPage, { page: page });
    }

    console.log("Clicked goToPage", page);
    
  }


  goToFeed(category: any) {
    console.log("Clicked goToFeed", category);
    this.nav.push(FeedPage, { category: category });
  }

}
