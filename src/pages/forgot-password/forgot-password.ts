import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { LoginPage } from '../login/login';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  forgot_password: FormGroup;
  loading: any;
  main_page: { component: any };

  constructor(public nav: NavController, public afAuth: AngularFireAuth, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.main_page = { component: LoginPage };

    this.forgot_password = new FormGroup({
      email: new FormControl('', Validators.required)
    });

    this.loading = this.loadingCtrl.create();
  }

  recoverPassword(){  

    this.loading.present();

    let email = this.forgot_password.value.email;    
    let requestingReset = this.afAuth.auth.sendPasswordResetEmail(email);

    let env = this;

    return requestingReset.then((response) => {
      // Email sent.
      env.loading.dismiss();

      let alert = env.alertCtrl.create({
          title: 'Reset Successful',
          subTitle: 'Please check your email and follow the link inside to set a new password',
          buttons: ['OK']
        });
      alert.present();

      this.nav.setRoot(this.main_page.component);
    }, function(error) {
      // An error happened.
      env.loading.dismiss();
      let alert = env.alertCtrl.create({
          title: 'Password Reset Failed',
          subTitle: 'No user can be found with this email address.',
          buttons: ['Try Again']
        });
      alert.present();
    });
    /*
    this.afAuth.auth.sendPasswordResetEmail(this.forgot_password.value).then((response) => {
      console.log('response', response);

      // Email sent.
      //this.loading.dismiss();

      //this.nav.setRoot(this.main_page.component);
    }, function(error) {
      console.log('error', error);
      // An error happened.
      /*
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Password Reset Failed',
          subTitle: 'No user can be found with this email address.',
          buttons: ['Try Again']
        });
        alert.present();
        */
    //});

    
  }

}
