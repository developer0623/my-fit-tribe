import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import 'rxjs/Rx';

import { ProfileModel } from '../profile/profile.model';
import { ProfileService } from '../profile/profile.service';
import { UserProvider } from '../../providers/user/user';

import { AfoListObservable, AfoObjectObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';


@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {
  settingsForm: FormGroup;
  // make WalkthroughPage the root (or first) page
  rootPage: any = LoginPage;
  loading: any;
  profile: ProfileModel = new ProfileModel();
  userProfile: AfoObjectObservable<any>;
  profileObservable: AfoObjectObservable<any>;
  user: any;
  userState: AfoListObservable<any[]>;
  profiles: AfoListObservable<any[]>;
  registered: any;
  registeredDate: any;
  currentDate: any;
  timeDifference: any;
  showLoginBtns: boolean;
  trialRemaining: any;

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public profileService: ProfileService,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public userService: UserProvider,
    private offlineDB: AngularFireOfflineDatabase,
    private store: InAppPurchase2
  ) {
    this.loading = this.loadingCtrl.create();

    this.settingsForm = new FormGroup({
      name: new FormControl()
    });

  }

  ngOnInit(){

    this.afAuth.authState.subscribe( user => {
      if(!user || user.isAnonymous){
        this.showLoginBtns = true;

        var getDaysLeft = this.userService.trialDaysLeft();
          
          getDaysLeft.subscribe(remaining => {
          console.log('remaining', remaining);

          if(remaining){
            console.log('remaining');
            this.trialRemaining = remaining;
          }
        });
      } else {
        this.user = user;
        this.showLoginBtns = false;

        this.profileObservable = this.offlineDB.object('/profiles/' + user.uid);

        this.profileObservable.subscribe(profile => {
          this.settingsForm.setValue({
            name: profile.name
          });
        });
      }
    } );

  }

  joinTribe(){
    let orderOne = this.store.order('com.myfittribe.challenge.monthlysub');

      orderOne.then(orderResponse => {
        console.log('orderResponse', orderResponse);
          if(orderResponse.owned){
            // this.navCtrl.setRoot(TabsNavigationPage);
          } else {
            console.log('something went wrong, not owned yet');
          }
      });
    }

  ionViewDidLoad() {
    /*this.loading.present();
    this.profileService
      .getData()
      .then(data => {
        this.profile.user = data.user;

        this.settingsForm.setValue({
          name: data.user.name,
          location: data.user.location,
          description: data.user.about,
          currency: 'dollar',
          weather: 'fahrenheit',
          notifications: true
        });

        this.loading.dismiss();
      });*/
  }

  saveProfile(){
    this.profiles = this.offlineDB.list('/profiles' );

    let updateProfile = this.profiles.update(this.user.uid, { 
      name: this.settingsForm.value.name
    });

    let env = this;

    updateProfile.then((response) => {
      console.log('update profile response', response);
      this.settingsForm.markAsPristine();

      let alert = env.alertCtrl.create({
            title: 'Profile Updated',
            subTitle: '',
            buttons: ['OK']
          });
          alert.present();
    })
  }

    toLogin(){
    this.nav.push(LoginPage);
  }

  toSignup(){
  this.nav.push(SignupPage);
  }

  logout() {
    // navigate to the new page if it is not the current page
    this.afAuth.auth.signOut().then((user) => {});
  }

  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }
}
