import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite } from 'ionic-native';
import { Database } from 'database';
import 'rxjs/add/operator/map';

@Injectable()
export class BanService {
  private key = 'A1A01F481B291A528D6971E0FCDC7029';
  private storage: SQLite;
  private userlist: any;
  data: string;

  constructor(public http: Http) {
    console.log('Hello BanService Provider');
  }

  // since the SteamAPI works off of a URL that ends in the list of users, that list needs to be created here
  getListforURL() {
    // maybe need to open the storage here
    new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM users", []).then((data) => {
              let userlist = "";
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        userlist.concat(userlist, data.rows.item(i).steamid);
                }
                }
                resolve(userlist);
            }, (error) => {
                reject(error);
            });
        });

        return this.userlist;  // might have to move this elsewhere
  }

  updateList(text){
  }

  load() {
  if (this.data) {
    // already loaded data
    return Promise.resolve(this.data);
  }

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + this.key + '&steamids=' + this.getListforURL)
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data.response.players;
        resolve(this.data);
      });
  });
}

}
