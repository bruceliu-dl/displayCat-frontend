import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {
  private requestUrl = 'http://5c92dbfae7b1a00014078e61.mockapi.io/owners';
  newResult: any;


  constructor(private _http: HttpClient) {
  }

  public getOnlineJsonData(): Observable<any> {
    let r = this._http.get(this.requestUrl)
      .pipe(map(
        res => {
          return this.convertResultForUI(res);
        })
      );
    return r;
  }

  private convertResultForUI(response: any) {
    if (response && response.length > 0) {
      let male = [];
      let female = [];
      for (let res of response) {
        if (res['gender'] === 'Male') {
          if (res['pets'] && res['pets'].length > 0 && res['pets'].some(d => d['type'] === 'Cat')) {
            let cats = [];
            for (let pet of res['pets']) {
              if (pet['type'] === 'Cat') {
                cats.push({'type': 'cat', 'name': pet['name']});
              }
            }
            male.push({
              'gender': res['gender'],
              'name': res['name'],
              'cat': cats
            });
          }
        } else {
          if (res['pets'] && res['pets'].length > 0 && res['pets'].some(d => d['type'] === 'Cat')) {
            let cats = [];
            for (let pet of res['pets']) {
              if (pet['type'] === 'Cat') {
                cats.push({'type': 'cat', 'name': pet['name']});
              }
            }
            female.push({
              'gender': res['gender'],
              'name': res['name'],
              'cat': cats
            });
          }
        }
      }
      this.newResult = {
        "male": male,
        "female": female
      };
      return this.newResult;
    }
  }
}
