import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { UserService } from '../../services/user.service';
// import { FacebookLoginService } from '../facebook-login/facebook-login.service';
// import { GoogleLoginService } from '../google-login/google-login.service';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  main_page: { component: any };
  loading: any;
  loginLoading: any;


  constructor(
    public nav: NavController,
    public userService: UserService,
    // public facebookLoginService: FacebookLoginService,
    // public googleLoginService: GoogleLoginService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('test', Validators.required)
    });
  }

  doLogin(){

    this.loginLoading = this.loadingCtrl.create();

    this.loginLoading.present();

    let env = this;

    return this.userService.loginEmail(this.login.value).then((user) => {
      if(user.uid){
        env.loginLoading.dismiss();

        // setProfile(user);
        // this.nav.setRoot(this.main_page.component);
      }  
    }, err => {
        env.loginLoading.dismiss();

        // console.log("Login error", err[0]);   
        // console.log("Login error", err[0]['code']);   
        console.log("Login error", err['code']);   
        // console.log("Login error", err.code);   

        if(err['code'] == 'auth/network-request-failed'){
          var errMsg = 'Please make sure you are connected to the internet and try again.';
        } else {
          var errMsg = 'Please make sure your email and password are correct.'
        } 

        let alert = env.alertCtrl.create({
          title: 'Login Failed',
          subTitle: errMsg,
          buttons: ['OK']
        });
        alert.present();        
      });
  }


  goToSignup() {
    this.nav.push(SignupPage);
  }

  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }

}
