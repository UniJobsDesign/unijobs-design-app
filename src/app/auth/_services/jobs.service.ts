import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {log} from "util";
import {Job} from "../_models/job";

@Injectable()
export class JobsService {
    private clientId = 'trusted-client';
    private clientSecret = 'secret';
    private basicHeader = btoa(this.clientId + ':' + this.clientSecret);

    constructor(public http: Http) {
    }


    private url = 'http://localhost:8080/api/job';

    public getJobs(page: number): Observable<Job[]> {
        const creds = 'access_token=' + localStorage.getItem('token');
        const getUrl = `${this.url}/jobs/${page}?${creds}`;
        return this.http.get(getUrl).map(this.handleData).catch(this.handleError);
    }

    private handleData(res: Response) {
        const body = res.json().jobs;
        return body;
    }

    private handleError (error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    public jobFilterByDescription(filtervalue: string): Observable<Job[]>{
        if (filtervalue === '')
            return this.getJobs(0);
        const creds = 'access_token=' + localStorage.getItem('token');
        const getUrl = `${this.url}/byDescription/${filtervalue}/1`;
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.basicHeader);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(getUrl, creds, {headers: headers}).map(this.handleData).catch(this.handleError);
    }

    public jobFilterByUser(): Observable<Job[]>{
        const creds = 'access_token=' + localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        console.log(userId);
        const getUrl = `${this.url}/getAllJobsForUser/${userId}?${creds}`;
        console.log(getUrl);
        return this.http.get(getUrl).map(this.handleData).catch(this.handleError);
    }

    public jobFilterByLocation(filtervalue: string): Observable<Job[]>{
        if (filtervalue === '')
            return this.getJobs(0);
        const creds = 'access_token=' + localStorage.getItem('token');
        const getUrl = `${this.url}/byLocation/${filtervalue}/1`;
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.basicHeader);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log(getUrl)
        return this.http.post(getUrl, creds, {headers: headers}).map(this.handleData).catch(this.handleError);

    }

    public jobFilterByUniUser(page: number): Observable<Job[]>{
        const creds = 'access_token=' + localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        console.log(userId);
        const getUrl = `${this.url}/byUser/${userId}/${page}?${creds}`;
        console.log(getUrl);
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.basicHeader);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(getUrl, {headers:headers}).map(this.handleData).catch(this.handleError);
    }


    addJob(job: Job)
    {
        const creds = 'access_token=' + localStorage.getItem('token');
        let header = new Headers({ 'Content-Type': 'application/json' });
        const getUrl = `${this.url}/newJob?${creds}`;
        console.log("Add job:",job);

        return this.http.post(getUrl, job, { headers: header }).map(this.handleData).catch(this.handleError);
    }
}
