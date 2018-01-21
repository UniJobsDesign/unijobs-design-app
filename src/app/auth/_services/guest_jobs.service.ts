import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { log } from "util";
import { Job } from "../_models/job";

@Injectable()
export class GuestJobsService {

    constructor(public http: Http) {
    }


    private url = 'http://localhost:8080/api/job';

    public getJobs(page: number): Observable<Job[]> {
        const userId = localStorage.getItem('userId');
        const getUrl = `${this.url}/jobs/${userId}/${page}`;
        return this.http.get(getUrl).map(this.handleData).catch(this.handleError);
    }

    public getAllJobs(page: number): Observable<Job[]> {
        const getUrl = `${this.url}/allJobs/${page}`;
        return this.http.get(getUrl).map(this.handleData).catch(this.handleError);
    }

    private handleData(res: Response) {
        const body = res.json().jobs;
        return body;
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    public jobFilterByDescription(filtervalue: string): Observable<Job[]> {
        if (filtervalue === '')
            return this.getJobs(0);
        const getUrl = `${this.url}/byDescription/${filtervalue}/1`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(getUrl, "", { headers: headers }).map(this.handleData).catch(this.handleError);
    }


    private handleDataR(res: Response) {
        console.log(res.json());
        const body = res.json();
        return body;
    }


}
