import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BanService {
  private key = 'A1A01F481B291A528D6971E0FCDC7029';
  public cheaterlist = '76561197960940108';
  data: any;

  constructor(public http: Http) {
    console.log('Hello BanService Provider');
  }

  // bullshit get and set methods until something else is figured out
  getList() {
    return this.cheaterlist;
  }

  updateList(text){
    this.cheaterlist = this.cheaterlist + "," + text;
  }

  load() {
  //if (this.data) {
    // already loaded data
    //return Promise.resolve(this.data);
  //}

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + this.key + '&steamids=' + this.cheaterlist)
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
