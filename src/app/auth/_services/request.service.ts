import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Headers } from '@angular/http';
import { Request } from "../_models/request";


@Injectable()
export class RequestService {
    private clientId = 'trusted-client';
    private clientSecret = 'secret';
    private basicHeader = btoa(this.clientId + ':' + this.clientSecret);

    constructor(public http: Http) { }

    private url = 'http://localhost:8080/api/request';


    public getRequests(status: string): Observable<Request[]> {
        const creds = 'access_token=' + localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const getUrl = `${this.url}/requestsFromByStatus/${userId}/${status}?${creds}`;
        console.log("get", getUrl);
        return this.http.get(getUrl).map(this.handleData).catch(this.handleError);
    }


    public getUserRequests(status: string): Observable<Request[]> {
        const creds = 'access_token=' + localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const getUrl = `${this.url}/requestsByStatus/${userId}/${status}?${creds}`;
        return this.http.get(getUrl).map(this.handleData).catch(this.handleError);
    }


    public getById(requestId: number): Observable<Request> {
        const creds = 'access_token=' + localStorage.getItem('token');
        const getUrl = `${this.url}/byId/${requestId}?${creds}`;
        console.log(getUrl);
        return this.http.get(getUrl).map(this.handleDataR).catch(this.handleError);

    }





    private handleData(res: Response) {
        const body = res.json().requests;
        return body;
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


    private handleDataR(res: Response) {
        const body = res.json();
        return body;
    }

    requestJob(jobid: number) {
        const creds = 'access_token=' + localStorage.getItem('token');
        let header = new Headers({ 'Content-Type': 'application/json' });
        const userId = localStorage.getItem('userId');
        const getUrl = `${this.url}/requestJob/${userId}?${creds}`;
        console.log("Request job:", jobid);

        return this.http.post(getUrl, jobid, { headers: header }).map(this.handleData).catch(this.handleError);
    }


    acceptRequest(reqId: number) {
        const creds = 'access_token=' + localStorage.getItem('token');
        let header = new Headers({ 'Content-Type': 'application/json' });
        const getUrl = `${this.url}/accept/${reqId}?${creds}`;
        //console.log("Request job:",jobid);

        return this.http.post(getUrl, { headers: header }).map(this.handleData).catch(this.handleError);
    }

    rejectRequest(reqId: number) {
        const creds = 'access_token=' + localStorage.getItem('token');
        let header = new Headers({ 'Content-Type': 'application/json' });
        const getUrl = `${this.url}/reject/${reqId}?${creds}`;
        //console.log("Request job:",jobid);

        return this.http.post(getUrl, { headers: header }).map(this.handleData).catch(this.handleError);
    }


    finishRequest(reqId: number) {
        const creds = 'access_token=' + localStorage.getItem('token');
        let header = new Headers({ 'Content-Type': 'application/json' });
        const getUrl = `${this.url}/finish/${reqId}?${creds}`;
        //console.log("Request job:",jobid);

        return this.http.post(getUrl, { headers: header }).map(this.handleData).catch(this.handleError);
    }


}
