import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite } from 'ionic-native';
import 'rxjs/add/operator/map';


@Injectable()
export class Database {

  private storage: SQLite;

  constructor(public http: Http) {
    console.log('Hello Database Provider');
    this.storage = new SQLite();
    this.storage.openDatabase({name: "salty.db", location: "default"}).then(() => {
                this.storage.executeSql("CREATE TABLE IF NOT EXISTS users (steamid INTEGER PRIMARY KEY, steamname TEXT, realname TEXT, avater TEXT)", []);
    });
  }

  public getUsers(){
    return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM users", []).then((data) => {
                let users = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        users.push({
                            steamid: data.rows.item(i).steamid,
                            steamname: data.rows.item(i).steamname,
                            realname: data.rows.item(i).realname,
                            avatar: data.rows.item(i).avatar
                        });
                    }
                }
                resolve(users);
            }, (error) => {
                reject(error);
            });
        });
  }

  public addUser(steamid: number, steamname: string, realname: string, avatar: string) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("INSERT INTO users (steamid, firstname, lastname, avatar) VALUES (?, ?, ?, ?)", [steamid, steamname, realname, avatar]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    public eraseAll() {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("DELETE FROM users", []).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

}
