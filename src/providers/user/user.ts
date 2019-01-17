import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

	subscriptionObservable: Observable<any>;
	receiptObservable: Observable<any>;
	trialObservable: Observable<any>;

  constructor(
  	private http: Http,
  	private db: AngularFireDatabase,
  	private device: Device,
  	private afAuth: AngularFireAuth,
    private nativeStorage: NativeStorage ) {
    // console.log('Hello UserProvider Provider');    
  }

  isMembershipValid(user: any){

  	return this.subscriptionObservable = this.db.object('/subscriptions/' + user.uid)
  		.mergeMap( subscription => {
        // return this.http.get('https://api.adorable.io/avatars/2')
        // .map(response => {
        // 	return response.text();
        // });

        
        return this.receiptObservable = this.http.post('https://buy.itunes.apple.com/verifyReceipt', {
            "receipt-data": subscription.receipt,
            "password": '68c2e823b67c443ab238da8554d9d196'
        })
        .map(response => {
        	var formattedData = response.json();

        	if(formattedData.status == 0){
        		this.nativeStorage.setItem('mft-isMember', {status: 'active'});
            return true;
        	} else {
        		this.nativeStorage.setItem('mft-isMember', {status: 'expired'});
            return false;
        	}
        });

        /*verifyReceipt.subscribe(result => {
            if(result.status == 0){
              // valid
              console.log('membership is valid');
              // this.navCtrl.setRoot(TabsNavigationPage);
              return true;
            } else {
              // expired
              console.log('membership is expired');
              // this.navCtrl.setRoot(SubscriptionPage);
              return false;
            }
        }); */
    });

  }  

  trialDaysLeft(){
    return this.db.object('/trials/' + this.device.uuid)
      .map((response) => {
          // is trial?
          if(response.downloaded){
            var registered = response.downloaded;
            var currentDate = Date.now();
            
            var timeDifference = currentDate - registered; // milliseconds to minutes

            if(timeDifference < 604800000){
              var ONE_DAY = 1000 * 60 * 60 * 24;
              var trialRemaining = 7 - (Math.round(timeDifference/ONE_DAY));

              return trialRemaining;
            }
          } else {
            return false;
          }
      })
  }

  isTrial(){

  	return this.trialObservable = this.db.object('/trials/' + this.device.uuid)
  		.map((response) => {
	      	// is trial?
	        if(response.downloaded){
	        	// is trial? YES

	          // 7days 168 hours 10080 minutes 604800 seconds 604800000 milliseconds
	          var registered = response.downloaded;
	          var currentDate = Date.now();
	          
	          var timeDifference = currentDate - registered; // milliseconds to minutes

	          if(timeDifference < 604800000){
	          	
	            // is trial active? Yes
	            console.log('trial active');
              this.nativeStorage.setItem('mft-isTrial', {status: 'active'});
	            // this.navCtrl.setRoot(TabsNavigationPage);

	            /*
	            console.log('not 7 days yet');  

	            var ONE_DAY = 1000 * 60 * 60 * 24;

	            this.isTrial = true;
	            this.trialRemaining = 7 - (Math.round(this.timeDifference/ONE_DAY));
	            */
	            
	            return 'active';

	          } else {
	            // is trial active? No
	            console.log('trial expired');
              this.nativeStorage.setItem('mft-isTrial', {status: 'expired'});
	            // this.navCtrl.setRoot(SubscriptionPage);
	            
	            return 'expired';
	          }

	        } else {
	          // is trial? NO
	          console.log('no trial found');
	          
	            return false;
	          // this.navCtrl.setRoot(WalkthroughPage);
	        }
	      })     	
        
      


  }

  verifyReceipt(subscription: any){
  	return this.http
	  		.post('https://sandbox.itunes.apple.com/verifyReceipt', {
		 		"receipt-data": subscription.receipt,
		 		"password": '68c2e823b67c443ab238da8554d9d196'
			})
			.map(response => {
        	var formattedData = response.json();

        	if(formattedData.status == 0){
        		return true;
        	} else {
        		return false;
        	}
        });;
  }

  /*
  isMembershipValid(user: any){

  	console.log('checking is membership valid...');

  	let subscriptionObj = this.db.object('/subscriptions/' + user.uid);

    subscriptionObj.subscribe(response => {
     	this.http.post('https://sandbox.itunes.apple.com/verifyReceipt', {
	 		"receipt-data": response.receipt,
	 		"password": '68c2e823b67c443ab238da8554d9d196'
		}).subscribe(response => {
		 	var jsonResponse = JSON.parse(response.text());
		 	var formattedCreationDate = new Date(jsonResponse.receipt.receipt_creation_date_ms);
		 	console.log('validation response', response);
		 	console.log('status', response.status);
		 	console.log('statusText', response.statusText);
		 	console.log('data', response.ok);
		 	console.log('body', jsonResponse);

		 if(jsonResponse.status === 0){
		  	console.log('Membership is valid');
		  	return true;
		 } else {
		  	console.log('Membership is expired', jsonResponse.status);
		  	return false;
		 }
		    	

		});
    });

  }
  */

}
