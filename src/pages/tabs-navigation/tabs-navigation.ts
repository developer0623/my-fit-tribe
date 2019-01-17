import { Component, OnInit, ViewChild } from '@angular/core';
import { Device } from '@ionic-native/device';
import { App, Nav, NavController, Platform } from 'ionic-angular';

import { ListingPage } from '../listing/listing';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage implements OnInit {
  @ViewChild(Nav) nav: Nav;

  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  goToIAP: boolean = true;

 

  constructor(
    public app: App,
    public platform: Platform,
    private device: Device,
    public navCtrl: NavController ) {
    this.tab1Root = ListingPage;
    this.tab2Root = SettingsPage;
    // this.navCtrl = navCtrl;
    // this.tab3Root = NotificationsPage;
  }

  ngOnInit(){



    // this.afAuth.authState.subscribe( user => {
    //   if(user.isAnonymous) {
    //     // is anon
    //     // check if trial exists
    //     this.checkIfNewUser();
    //   } else {
    //     /*var signInAnon = this.afAuth.auth.signInAnonymously();
    //     signInAnon.then(response => {
    //       this.checkIfNewUser();
    //     });*/
    //   }
    // });
    
  }

   /*
    checkIfNewUser(){
    let uuid = this.device.uuid;

    console.log('uuid', uuid);

    // var env = this;



    if(uuid){
      var trial = this.db.object('/trials/' + uuid);

      trial.subscribe((response) => {

        // if trial exists
        if(response.downloaded){
          // is trial active
          // console.log('not empty', response.downloaded);
          // this.registeredDate = new Date(response.downloaded);
          this.registered = response.downloaded; // new Date(response.registered);
          this.currentDate = Date.now();
          // 7days 168 hours 10080 minutes 604800 seconds 604800000 milliseconds
          this.timeDifference = this.currentDate - this.registered; // milliseconds to minutes
          if(this.timeDifference < 604800){
            // not 7 days yet
            console.log('not 7 days yet');            
          } else {
            console.log('trial has expired');
            this.goToIAP = true;
            this.navCtrl.setRoot(SubscriptionPage);
           // let navs = this.app.getRootNav();
           // navs.push(SubscriptionPage);
           // this.navCtrl.setRoot(SubscriptionPage);
            // this.nav.setRoot(SubscriptionPage);
          }
        } else {
          // create trial
          this.createTrial(uuid);
        }

      });

    } else {
      console.log('no uuid');
      // console.log('no device', this.afAuth.authState);
      this.navCtrl.setRoot(SubscriptionPage);
    }

  }

  createTrial(uuid: any){
    var trial = this.db.object('/trials/' + uuid);

    var setTrial = trial.set({
      downloaded: firebase.database.ServerValue.TIMESTAMP
    });

    setTrial.then(response => {
      console.log('setTrial', response);
    })
  }
  */
}
