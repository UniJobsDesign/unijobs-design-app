import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { User } from "../_models/user";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthenticationService {
    private OauthLoginEndPointUrl = 'http://localhost:8080/api/oauth/token';  // Oauth Login EndPointUrl to web API
    private OauthUser = 'http://localhost:8080/api/user';
    private clientId = 'trusted-client';
    private clientSecret = 'secret';
    private basicHeader = btoa(this.clientId + ':' + this.clientSecret);

    constructor(private http: Http) {
    }

    login(username: string, password: string) {
        console.log("Username: " + username)
        console.log("Password: " + password)

        const creds = 'grant_type=password'
            + '&username=' + username
            + '&password=' + password;

        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.basicHeader);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.OauthLoginEndPointUrl, creds, { headers: headers }).map((response: Response) => {
            return response.json();
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
}