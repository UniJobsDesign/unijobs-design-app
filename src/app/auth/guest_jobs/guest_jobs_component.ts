import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Job} from "../_models/job";
import {GuestJobsService} from "../_services/guest_jobs.service";

@Component({
    selector: 'app-guest-jobs',
    templateUrl: './guest_jobs.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class GuestJobsComponent implements OnInit {
    pageNo = 1;
    selectedDropDown = 'Description';
    guestJobs: Job[];
    whatever: string;

    constructor(private guestJobService: GuestJobsService) {
    }

    updateSelectedGuest(filterType: string) {
        // document.getElementById('search_concept_guest').innerHTML = filterType;
        // this.selectedDropDown = filterType;
    }

    ngOnInit() {
        this.guestJobService.getAllJobs(this.pageNo).subscribe(jbs => {
            this.guestJobs = jbs;
            console.log(this.guestJobs);
        });
    }

    filter(searchfilter: string) {
        switch (this.selectedDropDown) {
            case 'Description':
                this.guestJobService.jobFilterByDescription(searchfilter).subscribe(
                    filteredjobs => {
                        this.guestJobs = filteredjobs;
                    }
                );
                break;
            default:
                break;
        }

    }

    clear() {
        this.whatever = '';
        this.guestJobService.getAllJobs(this.pageNo).subscribe(jbs => {
            this.guestJobs = jbs;
            console.log(this.guestJobs);
        });
    }

    next() {
        this.guestJobService.getAllJobs(this.pageNo).subscribe(jbs => {
            if (jbs.length !== 0) {
                this.guestJobs = jbs;
                console.log(this.guestJobs);
                this.pageNo++;
            }
            else {
                console.log("last page");
            }
        });
    }

    prev() {
        if (this.pageNo >= 1) {
            this.guestJobService.getAllJobs(this.pageNo - 2).subscribe(jbs => {
                if (jbs.length !== 0) {
                    this.guestJobs = jbs;
                    console.log(this.guestJobs);
                    this.pageNo--;
                }
                else {
                    console.log("first page");
                }
            });
        }
    }
}