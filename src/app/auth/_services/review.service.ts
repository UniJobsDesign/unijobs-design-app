import { Injectable } from '@angular/core';

import { Http , Response, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Review} from "../_models/review";

@Injectable()
export class ReviewService {

  private clientId = 'trusted-client';
  private clientSecret = 'secret';
  private basicHeader = btoa(this.clientId + ':' + this.clientSecret);

  constructor(public http: Http) { }

  private url = 'http://localhost:8080/api/review';

  public getReviews(): Observable<Review[]> {
    const creds = 'access_token=' + localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const getUrl = `${this.url}/reviews/${userId}?${creds}`;
    console.log("get", getUrl);
    return this.http.get(getUrl).map(this.handleData).catch(this.handleError);
  }

  public createReview(review: Review): Observable<Review> {
    const creds = 'access_token=' + localStorage.getItem('token');
    let header = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const createUrl = `${this.url}/newReviewForUser?${creds}`;
    return this.http.post(createUrl, review , {headers: header}).map(this.handleData).catch(this.handleError);

  }

  private handleData(res: Response) {
    const body = res.json().reviews;
    return body;
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


}
