import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Job} from "../../../auth/_models/job";
import {Request} from "../../../auth/_models/request";
import {ActivatedRoute, Params} from "@angular/router";
import {JobsService} from "../../../auth/_services/jobs.service";
import {RequestService} from "../../../auth/_services/request.service";
import {ScriptLoaderService} from "../../../_services/script-loader.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./review.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ReviewComponent implements OnInit, AfterViewInit {

    application: Request;
    job: Job;

    constructor(private _script: ScriptLoaderService,
                private route: ActivatedRoute,
                private jobService: JobsService,
                private requestService: RequestService,) {}

    ngOnInit() {
        this.route.params.
        switchMap((params: Params) => this.jobService.getJobById(+params['jobid']))
            .subscribe(m => {
                console.log("Job:",m);
                this.job = m;
            });
        this.route.params.
        switchMap((params: Params) => this.requestService.getById(+params['appid']))
            .subscribe(m => {
                console.log("Request:",m);
                this.application = m;
            });

        console.log("revieeewwwwwwww", this.job);
    }
    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/demo/default/custom/header/actions.js');

    }

    review(){
        var description = document.getElementsByClassName('acidjs-rating-stars');
        console.log("jhkjhkkj", description);
        console.log("review", this.application.toUniUser.id);
    }
}