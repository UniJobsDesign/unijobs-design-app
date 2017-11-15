import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {
    private OauthUser = 'http://localhost:8080/api/user';
    private clientId = 'trusted-client';
    private clientSecret = 'secret';
    private basicHeader = btoa(this.clientId + ':' + this.clientSecret);

    constructor(private http: Http) {
    }

    verify() {
        const userId = localStorage.getItem('userId');
        const getUserCreds = 'access_token=' + localStorage.getItem('token');
        const getUrl = `${this.OauthUser}/getUserById?userId=${userId}&${getUserCreds}`;

        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.basicHeader);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(getUrl, { headers: headers }).map((response: Response) => response.json());
    }

    forgotPassword(email: string) {
        return this.http.post('/api/forgot-password', JSON.stringify({ email })).map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get('/api/users').map((response: Response) => response.json());
    }

    getById(id: number) {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.basicHeader);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const creds = 'access_token=' + localStorage.getItem('token');
        const getUrl = `${this.OauthUser}/getUserById?userId=${id}&${creds}`;
        console.log(getUrl);

        return this.http.get(getUrl, {headers: headers})
            .map(this.handleData)
            .catch(this.handleError);
    }


    getByUsername(username: string): Observable<User> {
        const headers = new Headers();
        console.log('----getByUsername----');
        console.log('username:', username);

        headers.append('Authorization', 'Basic ' + this.basicHeader);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const creds = 'access_token=' + localStorage.getItem('token');


        const getUrl = `${this.OauthUser}/getUserByName?username=${username}&${creds}`;
        console.log(getUrl);

        return this.http.get(getUrl, {headers: headers})
            .map((response: Response) => response.json());
    }


    create(user: User) {
        let header = new Headers({ 'Content-Type': 'application/json' });
        const getUrl = `${this.OauthUser}/newUser`;

        return this.http.post(getUrl, user, { headers: header }).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id).map((response: Response) => response.json());
    }

    private handleData(res: Response) {
        const body = res.json();
        return body;
    }

    private handleError (error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}