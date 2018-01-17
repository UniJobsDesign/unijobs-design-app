import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';import {Job} from "../../../auth/_models/job";
import {Request} from "../../../auth/_models/request";
import {ActivatedRoute, Params} from "@angular/router";
import {JobsService} from "../../../auth/_services/jobs.service";
import {extractStyleParams} from "@angular/animations/browser/src/util";
import {RequestService} from "../../../auth/_services/request.service";
import {ScriptLoaderService} from "../../../_services/script-loader.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styles: []
})
export class ReviewComponent implements OnInit {

  application: Request;
  job: Job;

  constructor(private route: ActivatedRoute, private jobService: JobsService, private requestService: RequestService) {

  }

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



}
