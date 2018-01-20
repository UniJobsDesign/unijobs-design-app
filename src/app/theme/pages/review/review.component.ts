import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Job} from "../../../auth/_models/job";
import {Request} from "../../../auth/_models/request";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {JobsService} from "../../../auth/_services/jobs.service";
import {RequestService} from "../../../auth/_services/request.service";
import {ScriptLoaderService} from "../../../_services/script-loader.service";
import {Review} from "../../../auth/_models/review";
import {ReviewService} from "../../../auth/_services/review.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./review.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ReviewComponent implements OnInit, AfterViewInit {

    application: Request;
    job: Job;
    stars: number = 0;
    reviewSuccess: boolean;
    reviewError: boolean;

    constructor(private _script: ScriptLoaderService,
                private route: ActivatedRoute,
                private jobService: JobsService,
                private requestService: RequestService,
                private reviewService: ReviewService,
                private _router: Router) {}

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
        var description = document.getElementsByClassName('note-editable')[0];
        console.log("review", this.application.toUniUser.id);
        console.log("desc", description.innerHTML.toString());
        console.log("stars", this.stars);

        var review: Review = <Review> {
            id: null,
            stars: this.stars,
            reviewedId: this.application.toUniUser.id,
            reviewerId: this.application.fromUniUser.id,
            comment: description.innerHTML.toString(),
        };

        if(description.innerHTML.toString().length == 0){
            console.log("NUUU LENGTH E 0");
        } else {
            console.log(review);
            this.reviewService.createReview(review).subscribe(data => {
                this.reviewSuccess = true;
                setTimeout(() => this.reviewSuccess = null, 3000);
                setTimeout(() => this._router.navigateByUrl('/index'), 500);


            }, error => {
                this.reviewError = true;
                setTimeout(() => this.reviewError = null, 3000);
            });
        }

    }

    setStars(nr) {
        this.stars = nr;
    }
}