import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides, AlertController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SubscriptionPage } from '../subscription/subscription';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'walkthrough-page',
  templateUrl: 'walkthrough.html'
})
export class WalkthroughPage implements OnInit {

  lastSlide = false;
  registered: any;
  registeredDate: any;
  currentDate: any;
  timeDifference: any;
  deviceId: any;
  trial: FirebaseObjectObservable<any>;

  @ViewChild('slider') slider: Slides;

  constructor(
    public navCtrl: NavController,
    private device: Device,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private nativeStorage: NativeStorage,
    public alertCtrl: AlertController ) {

    

  }

  ngOnInit(){

      
      
      var signInAnon = this.afAuth.auth.signInAnonymously();

      signInAnon.then(response => {
        this.checkIfNewUser();
      });
      
      
   
  }

  checkIfNewUser(){
    this.deviceId = this.device.uuid;

    // console.log('uuid', uuid);

    if(this.deviceId){
      this.trial = this.db.object('/trials/' + this.deviceId);

      this.trial.subscribe((response) => {

        // if trial exists
        if(response.downloaded){
          // is trial active
          // console.log('not empty', response.downloaded);
          // this.registeredDate = new Date(response.downloaded);
          this.registered = response.downloaded; // new Date(response.registered);
          this.currentDate = Date.now();
          // 7days 168 hours 10080 minutes 604800 seconds 604800000 milliseconds
          this.timeDifference = this.currentDate - this.registered; // milliseconds to minutes
          if(this.timeDifference < 604800000){
            // not 7 days yet
            console.log('not 7 days yet'); 
            this.nativeStorage.setItem('mft-isTrial', {status: 'active'});
            this.navCtrl.setRoot(TabsNavigationPage);           
          } else {
            console.log('trial has expired');
            this.nativeStorage.setItem('mft-isTrial', {status: 'expired'});
            this.navCtrl.setRoot(SubscriptionPage);
           // let navs = this.app.getRootNav();
           // navs.push(SubscriptionPage);
           // this.navCtrl.setRoot(SubscriptionPage);
            // this.nav.setRoot(SubscriptionPage);
          }
        }

      }, (error) => {
        this.nativeStorage.getItem('mft-isTrial')
          .then(
            data => {
              if(data['status'] == 'active'){
                this.navCtrl.setRoot(TabsNavigationPage);
              } else if(data['status'] == 'expired'){
                this.nativeStorage.getItem('mft-isMember')
                  .then(
                    data => {
                      if(data['status'] == 'active'){
                        this.navCtrl.setRoot(TabsNavigationPage);
                      } else if(data['status'] == 'expired'){
                        this.navCtrl.setRoot(SubscriptionPage);
                      }
                    });

          
              }
            });
      });

    } else {
      console.log('no uuid');
      // console.log('no device', this.afAuth.authState);
      // this.navCtrl.setRoot(SubscriptionPage);
    }

  }

  createTrial(){
    var signInAnon = this.afAuth.auth.signInAnonymously();

        signInAnon.then(anon => {
          this.trial = this.db.object('/trials/' + this.device.uuid);

          this.trial.subscribe((response) => {
            if(response.downloaded){
              this.navCtrl.setRoot(TabsNavigationPage);
            } else {
              var setTrial = this.trial.set({
                downloaded: firebase.database.ServerValue.TIMESTAMP
              });

              setTrial.then(response => {
                console.log('setTrial', response);
                this.nativeStorage.setItem('mft-isTrial', {status: 'active'})
                .then(
                  () => {
                    console.log('Stored item!');
                    this.navCtrl.setRoot(TabsNavigationPage);
                  },
                  error => console.error('Error storing item', error)
                );
                
              });
            }
          });
        })
        .catch(error => {
          console.log('issue with connection', error);

          let alert = this.alertCtrl.create({
            title: 'Connection',
            subTitle: 'We were unable to create your trial. Please make sure you are connected to the internet and try again.',
            buttons: ['OK']
          });
          alert.present();

        });



    
  }

  skipIntro() {
    // You can skip to main app
    // this.nav.setRoot(TabsNavigationPage);

    // Or you can skip to last slide (login/signup slide)
    this.lastSlide = true;
    this.slider.slideTo(this.slider.length());
  }

  onSlideChanged() {
    // If it's the last slide, then hide the 'Skip' button on the header
    this.lastSlide = this.slider.isEnd();
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  goToTabs() {
    this.navCtrl.push(TabsNavigationPage);
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }
}
