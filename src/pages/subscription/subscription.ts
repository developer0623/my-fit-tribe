import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
import { NativeStorage } from '@ionic-native/native-storage';

import { Http } from '@angular/http';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

/**
 * Generated class for the SubscriptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage implements OnInit {

	subscriptions: FirebaseObjectObservable<any>;
	fxuser: any;
	isUser: boolean;
	isLoggedIn: boolean;
	isAnon: boolean;
	isTrial: boolean;
	subPrice: any;
	productOne: any;

  constructor(  	 
  	private store: InAppPurchase2,
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public db: AngularFireDatabase, 
  	public afAuth: AngularFireAuth,
  	public http: Http,
  	private nativeStorage: NativeStorage ) {
	/*this.store
	 .getProducts(['com.myfittribe.challenge.monthlysub'])
	 .then((products) => {
	   console.log('products', products[0]['price']);
	   this.subPrice = products[0]['price'];
	    //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
	 })
	 .catch((err) => {
	   console.log('product err', err);
	 });*/

  }

  ngOnInit(){
  	// this.isTrial = this.navParams.get('trial');

  	/*this.store.restorePurchases()
            .then(purchases => {
              console.log('purchases', purchases);
              let lastestPurchase = purchases[purchases.length - 1];

              if(lastestPurchase == 0){
                this.nativeStorage.setItem('mft-isMember', {status: 'active'});
                this.navCtrl.setRoot(TabsNavigationPage);
              } else {
                this.nativeStorage.setItem('mft-isMember', {status: 'expired'});
              }
            }); */



        this.afAuth.authState.subscribe( user => {
    	    this.fxuser = user;

    	    console.log('firing subscription authState subscribe');
    	    // console.log('user id', this.fxuser.uid);
    	    // console.log('user', this.fxuser);

    	    
    			/*if(user.isAnonymous) {
    		      this.isAnon = true;
    		    } else {
    		      this.isAnon = false;
    		    }
    	    }*/

    	    

    	  });


/*
        this.store.verbosity = this.store.DEBUG;
        this.store.register({
          id: "com.myfittribe.challenge.monthlysub",
          alias: 'Monthly Subscription',
          type: this.store.PAID_SUBSCRIPTION        
        });

this.store.refresh();

            this.productOne = this.store.get('com.myfittribe.challenge.monthlysub');
              console.log('product get', this.productOne);

              if(this.productOne.owned){
                    console.log('product owned');
                    this.navCtrl.setRoot(TabsNavigationPage);
                  } else {
                    console.log('product not owned')
                  }

        this.store.error(function(e){
            console.log("ERROR " + e.code + ": " + e.message);
        });

        this.productOne = this.store.get('com.myfittribe.challenge.monthlysub');

        this.store.when('com.myfittribe.challenge.monthlysub').error(err => {
    console.log("store ERROR " + err.code + ": " + err.message);
});

        // Updated
        

            this.store.once('com.myfittribe.challenge.monthlysub').updated( product => {
               console.log('Loaded' + JSON.stringify(product));

              if (product.owned) {
                  console.log('app.subscriberMode();');
                console.log('this.nav.setRoot(TabsNavigationPage);');
                this.navCtrl.setRoot(TabsNavigationPage);
              } else {
                  console.log('app.guestMode();');
              }
            });

            this.store.when('com.myfittribe.challenge.monthlysub').error( (error) => {
             
        console.log('An Error Occured', error);
      }); */

        


        
  }

 logout() {
    // navigate to the new page if it is not the current page
    this.afAuth.auth.signOut().then((user) => {
      // this.navCtrl.setRoot(LoginPage);
    });
  }

joinTribe(){
    let productId = 'com.myfittribe.challenge.monthlysub';
    let purchaseToken = "pndncnfmhbkmmijmmopokbfk.AO-J1OwViaSYxO4hwuGKS1nKXAuQE0SpDq0B8kEtOs1MRKW4BSiG5QAthuPz8rnZQvc0bUuHnSALH5HCmboktq86fwXMcypvCvXl60A8FMuuXy60EBar14hdO1teWeBJVA2O4zVXySlNtURCRwojsAyF1RYBphoZ5A";

    this.store.validator = "https://api.fovea.cc:1982/check-purchase";

    let orderOne = this.store.order('com.myfittribe.challenge.monthlysub');

    this.store.when("com.myfittribe.challenge.monthlysub").approved(function(product) {
        console.log("aproved");
        // product.verify();
        product.finish();
        this.navCtrl.setRoot(TabsNavigationPage);
    });

    // this.store.when("com.myfittribe.challenge.monthlysub").verified(function(product) {
    //     console.log("verified");
    //     product.finish();
    //     this.navCtrl.setRoot(TabsNavigationPage);
    // });

    this.store.when(productId).updated( (product) => {
      console.log('Loaded' + JSON.stringify(product));

      if(product.owned){
        console.log('product owned updated');
        this.navCtrl.setRoot(TabsNavigationPage);
      }
    });

      // orderOne.then(orderResponse => {
      //   this.store.refresh();

      //   var productTwo = this.store.get('com.myfittribe.challenge.monthlysub');

      //   console.log('orderResponse', orderResponse);

      //     // this.createSubscription(orderResponse);

      //     if(productTwo.owned){
      //       this.navCtrl.setRoot(TabsNavigationPage);
      //     } else {
      //       console.log('something went wrong, not owned yet');
      //     }
      // });
    }


  	/*this.store
	  .subscribe('com.myfittribe.challenge.monthlysub')
	  .then((data)=> {
	    console.log('data', data);
	    console.log('receipt', data.receipt);	    

	    this.createSubscription(data);

	    // {
	    //   transactionId: ...
	    //   receipt: ...
	    //   signature: ...
	    // }
	  })
	  .catch((err)=> {
	    console.log(err);
	  });*/
  

  toLogin(){
  	this.navCtrl.push(LoginPage);
  }

  toSignup(){
	this.navCtrl.push(SignupPage);
  }

  createSubscription(data: any){
  	let newSub = this.db.object('/subscriptions/' + this.fxuser.uid);

  	newSub.set({
	  	data: JSON.stringify(data)
	  });

    // this.navCtrl.setRoot(TabsNavigationPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionPage');
  }

}
