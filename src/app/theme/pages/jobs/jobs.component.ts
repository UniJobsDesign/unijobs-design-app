import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Job} from "../../../auth/_models/job";
import {JobsService} from "../../../auth/_services/jobs.service";
import {RequestService} from "../../../auth/_services/request.service";
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: ".m-wrapper .m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./jobs.component.html",
    encapsulation: ViewEncapsulation.None
})
export class JobsComponent implements OnInit {
    pageNo = 1;
    selectedDropDown = 'Description';
    jobs: Job[] = [];
    whatever: string;
    selectedJob: Job = new Job();
    successfulApplied: boolean;
    errorApplied: boolean;

    constructor(private jobService: JobsService) {
    }

    updateSelected(filterType: string) {
        document.getElementById('search_concept').innerHTML = filterType;
        this.selectedDropDown = filterType;
    }

    ngOnInit() {
        this.jobService.getJobs(this.pageNo-1).subscribe(jbs => {
            this.jobs = jbs;
            console.log(this.jobs);
        });
    }

    filter(searchfilter: string) {
        switch (this.selectedDropDown) {
            case 'Location':
                console.log('case Location');
                this.jobService.jobFilterByLocation(searchfilter).subscribe(
                    filteredjobs => {
                        this.jobs = filteredjobs;
                    }
                );
                break;
            case 'Description':
                this.jobService.jobFilterByDescription(searchfilter).subscribe(
                    filteredjobs => {
                        this.jobs = filteredjobs;
                    }
                );
                break;
            default:
                break;
        }

    }

    clear() {
        this.whatever = '';
        this.jobService.getJobs(this.pageNo).subscribe(jbs => {
            this.jobs = jbs;
            console.log(this.jobs);
        });
    }

    next(searchfilter) {
        console.log("Page number: ", this.pageNo);
        console.log("seadasdsdada",searchfilter);
        this.jobService.getJobs(this.pageNo).subscribe(jbs => {
            if (jbs.length !== 0) {
                this.jobs = jbs;
                console.log(this.jobs);
                this.pageNo++;
            }
            else {
                console.log("last page");
            }
        });
    }

    prev() {
        console.log("Page number: ", this.pageNo);
        if (this.pageNo > 1) {
            this.jobService.getJobs(this.pageNo - 2).subscribe(jbs => {
                if (jbs.length !== 0) {
                    this.jobs = jbs;
                    console.log(this.jobs);
                    this.pageNo--;
                }
                else {
                    console.log("first page");
                }
            });
        }
    }



    apply(job: Job){
        console.log(job.id);
        this.jobService.requestJob(job.id).subscribe(jbs => {
            //this.guestJobs = jbs;
            this.successfulApplied = true;
            setTimeout(() => this.successfulApplied = null, 3000);
           console.log(jbs);
        }, error => {
            this.errorApplied = true;
            setTimeout(() => this.errorApplied = null, 3000);
        });
    }

    selectJob(job: Job) {
        job.startDate = job.startDate.substring(0, 10);
        job.endDate = job.endDate.substring(0, 10);
        this.selectedJob = job;
    }

}