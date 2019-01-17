import {Injectable} from '@angular/core';
import { Platform } from 'ionic-angular';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class PhotosService {

  // SQLite
  

  // Init an empty DB if it does not exist by now!
  constructor(public platform: Platform, private nativeStorage: NativeStorage) {
    this.platform.ready().then(() => {


    });
  }

  // Find a photo in our DB
  public findPhotoByURL(url: string) {
  	return this.nativeStorage.getItem(url);
	  /*
	  .then(
	    data => console.log('get item', data),
	    error => console.error('get item error', error)
	  );
	  */

    /*let sql = 'SELECT imageBase64String FROM photos WHERE url = \"' + url + '\" limit 1';
    return this.sqlite.create({
    		name: 'cache.db', 
    		location: 'default'
    	})
    	.then((db: SQLiteObject) => { db.executeSql(sql); });*/
  }

  // Save a new photo to the DB
  public savePhoto(url: string, imageBase64String: string) {
  	this.nativeStorage.setItem('url', {imgBaseString: imageBase64String})
	  .then(
	    () => console.log('Stored item!'),
	    error => console.error('Error storing item', error)
	  );

    /*
    let sql = 'INSERT INTO photos (url, imageBase64String) VALUES (?,?)';
    return this.sqlite.create({
    		name: 'cache.db', 
    		location: 'default'
    	})
    	.then((db: SQLiteObject) => { db.executeSql(sql, [url, imageBase64String]); });
    	*/
  }
}
