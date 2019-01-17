import { Injectable } from "@angular/core";

import 'rxjs/add/operator/first';
import 'rxjs/Rx' ;
import 'rxjs/add/operator/toPromise';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ScheduleService {
  importantDates: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.importantDates = db.list('/important-dates');
  }

  getList(type: String) {
    return this.db.list('/important-dates', {
      query: {
        orderByChild: 'list',
        equalTo: type
      }
    });
  }

  addItem() {
    this.importantDates.push({ subject: 'Test' });
  }

  /*getData(): Promise<ScheduleModel> {
    return this.http.get('./assets/example_data/schedule.json')
     .toPromise()
     .then(response => response.json() as ScheduleModel)
     .catch(this.handleError);
  }*/





  /*
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  */

}
