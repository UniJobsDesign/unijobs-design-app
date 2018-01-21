import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../auth/_services/request.service";
import {Request} from "../../../auth/_models/request";
import {async} from "rxjs/scheduler/async";
import {Job} from "../../../auth/_models/job";
import {JobsService} from "../../../auth/_services/jobs.service";
import {Router} from "@angular/router";

@Component({
  selector: '.m-wrapper',
  templateUrl: './candidates.component.html',
  styles: []
})
export class CandidatesComponent implements OnInit {

  applicationspending: Request[] = [];
  applicationsaccepted: Request[] = [];
  applicationsrejected: Request[] = [];
  applicationsfinished: Request[] = [];
  jobspending: Job[] = [];
  jobsaccepted: Job[] = [];
  jobsrejected: Job[] = [];
  jobsfinished: Job[] = [];
  acceptUser: boolean;
  rejectUser: boolean;

  constructor(private requestService: RequestService,
              private jobService: JobsService,
              private router: Router) {

  }

  ngOnInit() {
    this.loadPending();
    this.loadAccepted();
    this.loadRejected();
    this.loadFinished();
    //console.log("finished:", this.applicationsfinished);
  }


  loadPending() {
    this.requestService.getUserRequests('PENDING').subscribe(jbs => {
      this.applicationspending = jbs;
      console.log(this.applicationspending);
      let jo: Job[] = [];
      for (let entry of this.applicationspending) {
        //console.log(entry.job);
        this.jobService.getJobById(entry.job).subscribe(jb => {
          //console.log(jb.description);
          jo.push(jb);
          //console.log("----",this.jobspending)
        });// 1, "string", false
      }
      this.jobspending = jo;
    });
  }

  loadAccepted() {
    this.requestService.getUserRequests('ACCEPTED').subscribe(jbs => {
      this.applicationsaccepted = jbs;
      console.log(this.applicationsaccepted);
      let jo: Job[] = [];
      for (let entry of this.applicationsaccepted) {
        //console.log(entry.job);
        this.jobService.getJobById(entry.job).subscribe(jb => {
          //console.log(jb.description);
          jo.push(jb);
          //console.log("----",this.jobsaccepted)
        });// 1, "string", false
      }
      this.jobsaccepted = jo;
    });
  }

  loadRejected() {
    this.requestService.getUserRequests('REJECTED').subscribe(jbs => {
      this.applicationsrejected = jbs;
      console.log(this.applicationsrejected);
      let jo: Job[] = [];
      for (let entry of this.applicationsrejected) {
        //console.log(entry.job);
        this.jobService.getJobById(entry.job).subscribe(jb => {
          //console.log(jb.description);
          jo.push(jb);
          //console.log("----",this.jobsrejected)
        });// 1, "string", false
      }
      this.jobsrejected = jo;
    });
  }

  loadFinished(){
    this.requestService.getUserRequests('FINISHED').subscribe(jbs => {
      this.applicationsfinished = jbs;
      console.log(this.applicationsfinished);
      let jo: Job[] = [];
      for (let entry of this.applicationsfinished) {
        //console.log(entry.job);
        this.jobService.getJobById(entry.job).subscribe(jb => {
          //console.log(jb.description);
          jo.push(jb);
          //console.log("----",this.jobsfinished)
        });// 1, "string", false
      }
      this.jobsfinished = jo;
    });
  }


  accept(app: Request){
    if(app.status == "PENDING") {
      console.log(app.id);
      this.requestService.acceptRequest(app.id).subscribe( req => {
        console.log(req);
        this.loadAccepted();
        this.loadPending();
        this.acceptUser = true;
        setTimeout(() => this.acceptUser = null, 3000);
      }, error => {
        this.rejectUser = true;
        setTimeout(() => this.rejectUser = null, 3000);
      })
    }
  }


  reject(app: Request){
    if(app.status == "PENDING") {
      console.log(app.id);
      this.requestService.rejectRequest(app.id).subscribe( req => {
        console.log(req);
        this.loadRejected();
        this.loadPending();
      })
    }
  }

  finish(app:Request){
    if(app.status == "ACCEPTED") {
      console.log("ID:",app.id);
      this.requestService.finishRequest(app.id).subscribe( req => {
        console.log(req);
        this.loadFinished();
        this.loadAccepted();
      })
    }
  }

  review(app){
    this.router.navigate(['review',app]);
  }

}
