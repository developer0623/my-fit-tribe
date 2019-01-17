import { Component, ViewChild, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Platform, MenuController, Nav, App, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Device } from '@ionic-native/device';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { EducationPage } from '../pages/education/education';
import { NutritionPage } from '../pages/nutrition/nutrition';
import { SchedulePage } from '../pages/schedule/schedule';
import { TrainingsPage } from '../pages/trainings/trainings';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { SubscriptionPage } from '../pages/subscription/subscription';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UserProvider } from '../providers/user/user';

import { NativeStorage } from '@ionic-native/native-storage';

import { ImageLoaderConfig } from 'ionic-image-loader';


@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  //items: FirebaseListObservable<any[]>;

  @ViewChild(Nav) nav: Nav;

  // make WalkthroughPage the root (or first) page
  rootPage: any;
  rootUser: any;
  isSubscription: any;
  isMembershipValid: any;
  isTrial: any;
  verifyReceipt: Observable<any>;
  productId: any;
  productOne: any;
  loader: any;
  trial: any;
  trialDaysLeft: any;
  trialRemaining: any;
  androidVerifyUrl: any;
  // rootPage: any = WalkthroughPage;
  // rootPage: any = TabsNavigationPage;


  pages: Array<{title: string, icon: string, component: any}>;
  pushPages: Array<{title: string, icon: string, component: any}>;

  constructor(
    platform: Platform,
    private device: Device,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public store: InAppPurchase2,
    public userService: UserProvider,
    private http: Http,
    private nativeStorage: NativeStorage,
    private imageLoaderConfig: ImageLoaderConfig,
    public loadingCtrl: LoadingController
  ) {

    this.imageLoaderConfig.setImageReturnType('base64');
    this.imageLoaderConfig.setConcurrency(5);
    this.imageLoaderConfig.enableSpinner(false);
    this.imageLoaderConfig.setBackgroundSize('cover');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.      
      this.splashScreen.hide();
      this.statusBar.styleDefault(); 
      this.productId = 'com.myfittribe.challenge.monthlysub';
      this.loader = this.loadingCtrl.create();



            

            /**/

            // VERIFY SUBSCRIPTION
            this.store.verbosity = this.store.DEBUG;
            this.store.register({
              id: "com.myfittribe.challenge.monthlysub",
              alias: 'Monthly Subscription',
              type: this.store.PAID_SUBSCRIPTION        
            });

            this.store.refresh();

            let purchaseToken = "pndncnfmhbkmmijmmopokbfk.AO-J1OwViaSYxO4hwuGKS1nKXAuQE0SpDq0B8kEtOs1MRKW4BSiG5QAthuPz8rnZQvc0bUuHnSALH5HCmboktq86fwXMcypvCvXl60A8FMuuXy60EBar14hdO1teWeBJVA2O4zVXySlNtURCRwojsAyF1RYBphoZ5A";

            this.store.validator = "https://www.googleapis.com/androidpublisher/v2/applications/com.myfittribe.challenge/purchases/subscriptions/" + this.productId + "/tokens/" + purchaseToken;

            var options = {
            type: "service_account",
            project_id: "mft-api-access",
            private_key_id: "7110d1eff4f8643f4f5625e3746687b82640b945",
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRm26R4mBO95ZO\nuwYuITvTDZ37luJn0oxxrRZnqjK0fgGoKd61W5JR1k6y4nAyNUjq9pwxFv2LN/1n\n9qw0j3u6d+B0xfaFue3UVF3xqOfkuyLypy6CZozrzBfLnVImcHVkTFhgqUel4MZ2\njOJJAEKby+ffCiCsBv11cpCaH3RceYFJyLhQChCrNARkL+3DDUvWesZupaYvnJI6\nMcv1IxJp/+TDDx2KevRft0oQCT/Axmi/EtFjtxoUjXRObUTB/Y0HWrx9gWYgKsxk\nyebmkGzm4cmHClpeHiJboMf4xXSyUATpJXf09Jz3/mfbTMAJUjj1AX/bM9OG5Oyw\nLl9e3pw/AgMBAAECggEAApw/w25WdQqioxFeMYCKyQVAOewLnsUMUwrCSYE2R3F9\nniADXNkqmH1QQUG4/vm955CG/8TXBymn12hxhZK3NOpy76awJsMwLIxDwpOFa8pO\n1EceY6kDnpjN6mRnq6s2iGIRBFx8qXAEA2GcHHz112XchIu7k2402tvAju15sABy\nPkWHxiKCnjErdDiRjPcwYWnfF9cw4dz9s1MTKIY6z/UbxoJ8GRXTBHyQ/G/NIlpB\nHidcO/qe/a6lRLgYeSruVU2jxmMUti6etebcvmOf8YaRQfHvPIGp7rjmH90kIDFS\nIxTb2Ds2tAlTO/rYPkK0Zr/APt5+am8Xh2LdAwIGfQKBgQD/ypZwjqgYh/Bg5E8l\noW5eLFOPrkfZfZo/nupIGusNwSkisDQ+gKYYQ3mKcCs55cbWN6kpaJ1MZwZvg+0f\nwkxXIJMUKG/GPwwF9NPYJ91mKETU/Jfu8iSuQ3DBCMtTRuaPbStFhHedt+HspUrg\nf5qKkWdfQXvBk2+057nMETFvowKBgQDRxzNPwRWeNdY6xVjUMlOX5fvFCPEz7Nw+\nvzY3fz1m1EDpZq2DbWQeWim8LFmH7KaN2lStDMNzj9f1dsutM7zeNj/RTxoqv7c/\njl0Mu1ey5cPdbjWd8JR5QNwQ8caWupNwPCYHOv2eaE2kJxVoNYQIegiJsRBhigNR\ndTZLGN16tQKBgDIpVF82WpiU7/rQSwUiJzaokqp2jviDvSAE1gTV4oqL+rkmvNgU\n+n1/nfIcFR4BhYC04aORNGerPIPZ50J3I+liJfWqCGFkM8NnQ7P7/VrvQrBR6Kmf\nKrpR12bDhrwKB2TRD89OLvbq/I8fyxNDctcBtLfla5OGij17w9/U71DpAoGBANFu\ns56bIU8LZq7UGYP4HpbW583lyJFTlusaETHE2XNQ0uFyPiapTrwyvdn82QGn1Pxo\nDgOaa4NzB2Mrz9pCffvHY10/QNuO/Y75PZKZcsvLMgleny7oYgLQKyTLjL0s1kfF\n9R1g2pWMgn8w+eFJFGE2HFIDMVx/4iIwCB1fXLbFAoGBAK2kkrOiuNjU+6Cuz1It\nnNGFjpTA8t6/B5Uf06+XaY74bTk6KfU0kk2NwNHdXHz9bDqQgeulHjkqIUltu/MB\n+81+AZX353p8qcx+saqaVQ5NiTbZ+r23SEjh50SE56bJNxqvabux79ZH2/WldMSz\nlzpfawAGe2GiQhTMH4rUWsUv\n-----END PRIVATE KEY-----\n",
            client_email: "apiauth@mft-api-access.iam.gserviceaccount.com",
            client_id: "111160086059862020636",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://accounts.google.com/o/oauth2/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/apiauth%40mft-api-access.iam.gserviceaccount.com"
          };

            this.http.get(this.androidVerifyUrl, options).map(res => res.json()).subscribe(data => {
                
                console.log('something got verified', data);
            });




            this.productOne = this.store.get(this.productId);
              console.log('product get', this.productOne);

              if(this.productOne.owned){
                    console.log('product owned');
                    this.nav.setRoot(TabsNavigationPage);
              } else {
                    console.log('product not owned')
                    this.nav.setRoot(SubscriptionPage);
              }

              // this.store.when(this.productId).updated( (product) => {
              //    console.log('Loaded' + JSON.stringify(product));

              //    if(product.owned){
              //       console.log('product owned updated');
              //       this.nav.setRoot(TabsNavigationPage);
              //     } else {
              //       console.log('product not owned updated')
              //       this.nav.setRoot(SubscriptionPage);
              //     }
              // });

              // this.store.when(this.productId).registered(product => {
              //   console.log('Registered: ' + JSON.stringify(product));

              //     if(product.owned){
              //       console.log('product owned updated');
              //       this.nav.setRoot(TabsNavigationPage);
              //     } else {
              //       console.log('product not owned updated')
              //       this.nav.setRoot(SubscriptionPage);
              //     }
              
              // });

              // this.store.when(this.productId).approved(product => {
              //     // synchronous
              //     console.log('approved');
              //     product.finish();

              //     if(product.owned){
              //       console.log('product owned updated');
              //       this.nav.setRoot(TabsNavigationPage);
              //     } else {
              //       console.log('product not owned updated')
              //       this.nav.setRoot(SubscriptionPage);
              //     }
              // });

              // this.store.when('com.myfittribe.challenge.monthlysub').error(err => {
              //             console.log("store ERROR " + err.code + ": " + err.message);
              // });





      }); // close platform ready



    this.pages = [
      { title: 'Dashboard', icon: 'home', component: TabsNavigationPage }
      // { title: 'Forms', icon: 'create', component: FormsPage },
      // { title: 'Functionalities', icon: 'code', component: FunctionalitiesPage }
    ];

    this.pushPages = [
      { title: 'Nutrition', icon: 'nutrition', component: NutritionPage },
      { title: 'Training', icon: 'videocam', component: TrainingsPage },
      { title: 'Important Dates', icon: 'calendar', component: SchedulePage },     
      { title: 'Education', icon: 'ios-school', component: EducationPage },
      { title: 'Settings', icon: 'settings', component: SettingsPage }
    ];

  

  
  } // close constructor

  ngOnInit() {
    
       this.afAuth.authState.subscribe( user => {
          if(!user){
            this.afAuth.auth.signInAnonymously();
          }         

        });

            
    

  }

checkOfflineAccess(){

          this.nativeStorage.getItem('mft-isTrial')
          .then(
            data => {
              if(data['status'] == 'active'){
                this.nav.setRoot(TabsNavigationPage);
              } else if(data['status'] == 'expired') {
                this.nativeStorage.getItem('mft-isMember')
                    .then(
                      data => {
                        if(data['status'] == 'active'){
                          this.nav.setRoot(TabsNavigationPage);
                        } else if(data['status'] == 'expired'){ 
                          this.nav.setRoot(SubscriptionPage); 
                        } else {
                          this.nav.setRoot(WalkthroughPage);
                        }
                      }
                    );
              } else {
                this.nav.setRoot(WalkthroughPage);
              }
            },
            error => {
              console.error(error);
              this.nav.setRoot(WalkthroughPage);
            }
          );

}

  handleTrial(trial: any){
    if(trial == 'active'){
        // trial is active
        this.nativeStorage.setItem('mft-isTrial', {status: 'active'});
        this.nav.setRoot(TabsNavigationPage);

        this.splashScreen.hide();
    } else if(trial == 'expired'){
        // trial is expired
        this.nativeStorage.setItem('mft-isTrial', {status: 'expired'});
        this.nav.setRoot(SubscriptionPage);
        this.splashScreen.hide();
      
    } else {
      //no trial exists
      this.nav.setRoot(WalkthroughPage);
      this.splashScreen.hide();
    }
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page.component);
  }
}
