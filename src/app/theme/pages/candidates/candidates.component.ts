import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../auth/_services/request.service";
import {Request} from "../../../auth/_models/request";
import {async} from "rxjs/scheduler/async";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidates.component.html',
  styles: []
})
export class CandidatesComponent implements OnInit {

  applicationspending: Request[] = [];
  applicationsaccepted: Request[] = [];
  applicationsrejected: Request[] = [];
  applicationsfinished: Request[] = [];

  constructor(private requestService: RequestService) {

  }

  ngOnInit() {
    this.loadPending();
    this.loadAccepted();
    this.loadRejected();
    this.loadFinished();
  }


  loadPending() {
    this.requestService.getUserRequests('PENDING').subscribe(jbs => {
      this.applicationspending = jbs;
      console.log(this.applicationspending);
    });
  }

  loadAccepted() {
    this.requestService.getUserRequests('ACCEPTED').subscribe(jbs => {
      this.applicationsaccepted = jbs;
      console.log(this.applicationsaccepted);
    });
  }

  loadRejected() {
    this.requestService.getUserRequests('REJECTED').subscribe(jbs => {
      this.applicationsrejected = jbs;
      console.log(this.applicationsrejected);
    });
  }

  loadFinished(){
    this.requestService.getUserRequests('FINISHED').subscribe(jbs => {
      this.applicationsfinished = jbs;
      console.log(this.applicationsfinished);
    });
  }


  accept(app: Request){
    if(app.status == "PENDING") {
      console.log(app.id);
      this.requestService.acceptRequest(app.id).subscribe( req => {
        console.log(req);
        this.loadAccepted();
        this.loadPending();
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

}
