import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {Job} from "../_models/job";
import {JobsService} from "../_services/jobs.service";

@Component({
    selector: 'app-guest-jobs',
    templateUrl: './guest_jobs.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class GuestJobsComponent implements OnInit {
    pageNo = 1;
    selectedDropDown = 'Description';
    jobs: Job[];
    whatever: string;

    constructor(private jobService: JobsService) {
    }

    updateSelected(filterType: string) {
        document.getElementById('search_concept').innerHTML = filterType;
        this.selectedDropDown = filterType;
    }

    ngOnInit() {
        this.jobService.getAllJobs(this.pageNo).subscribe(jbs => {
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
        this.jobService.getAllJobs(this.pageNo).subscribe(jbs => {
            this.jobs = jbs;
            console.log(this.jobs);
        });
    }

    next() {
        this.jobService.getAllJobs(this.pageNo).subscribe(jbs => {
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
        if (this.pageNo >= 1) {
            this.jobService.getAllJobs(this.pageNo - 2).subscribe(jbs => {
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
}