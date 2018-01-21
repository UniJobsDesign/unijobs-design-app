import { Component, OnInit } from '@angular/core';
import {JobsService} from "../../../auth/_services/jobs.service";
import {RequestService} from "../../../auth/_services/request.service";
import {Job} from "../../../auth/_models/job";
import {Request} from "../../../auth/_models/request";
import {Router} from "@angular/router";

@Component({
  selector: '.m-wrapper .m-grid__item.m-grid__item--fluid.m-wrapper',
  templateUrl: './jobapplications.component.html',
  styles: []
})
export class JobapplicationsComponent implements OnInit {
    pageNo = 1;
    selectedDropDown = 'Description';
    applicationspending: Request[] = [] ;
    applicationsaccepted: Request[] = [];
    applicationsrejected: Request[] = [];
    applicationsfinished: Request[] = [];
    jobspending: Job[] = [];
    jobsaccepted: Job[] = [];
    jobsrejected: Job[] = [];
    jobsfinished: Job[] = [];
    whatever: string;
    selectedJob: Job = new Job();


  constructor(private requestService: RequestService, private jobService: JobsService,private router: Router) { }

  ngOnInit() {
      this.loadPending();
      this.loadAccepted();
      this.loadRejected();
      this.loadFinished();
      console.log("apppending",this.applicationspending);

  }


    loadPending() {
        this.requestService.getRequests("PENDING").subscribe(jbs => {
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
        console.log("apppending",this.applicationspending);

    }

    loadJobsPending() {
      if(this.applicationsaccepted){
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
      }
        console.log("pending",this.jobspending);
    }

    loadAccepted() {
        this.requestService.getRequests('ACCEPTED').subscribe(jbs => {
            this.applicationsaccepted = jbs;
            console.log("appaccepted:",this.applicationsaccepted);
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
        console.log("accepted",this.jobsaccepted);
    }

    loadRejected() {
        this.requestService.getRequests('REJECTED').subscribe(jbs => {
            this.applicationsrejected = jbs;
            console.log("apprejected:",this.applicationsrejected)
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
        console.log("rejected",this.jobsrejected);
    }

    loadFinished(){
        this.requestService.getRequests('FINISHED').subscribe(jbs => {
            this.applicationsfinished = jbs;
            console.log("appfinished:",this.applicationsfinished);
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
        console.log("finished",this.jobsfinished);
    }

    review(app){
        this.router.navigate(['review',app]);
    }

    selectJob(job: Job) {
        job.startDate = job.startDate.substring(0, 10);
        job.endDate = job.endDate.substring(0, 10);
        this.selectedJob = job;
    }

}
