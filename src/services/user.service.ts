import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService {
  constructor(
    public http: Http,
    public afAuth: AngularFireAuth, 
    public af: AngularFireDatabase) {}

  registerUser(user) {
    // console.log(this.signup.value.email)
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);    
  }

  loginEmail(user){
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  setProfile(user){
    
  }

  /*getPosts(): Promise<FeedPostModel[]> {
    return this.http.get('./assets/example_data/feed.json')
               .toPromise()
               .then(response => response.json().feed as FeedPostModel[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }*/
}
