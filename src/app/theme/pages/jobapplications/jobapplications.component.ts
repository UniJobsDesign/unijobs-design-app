import { Component, OnInit } from '@angular/core';
import {JobsService} from "../../../auth/_services/jobs.service";
import {RequestService} from "../../../auth/_services/request.service";
import {Job} from "../../../auth/_models/job";
import {Request} from "../../../auth/_models/request";

@Component({
  selector: 'app-jobapplications',
  templateUrl: './jobapplications.component.html',
  styles: []
})
export class JobapplicationsComponent implements OnInit {
    pageNo = 1;
    selectedDropDown = 'Description';
    applications: Request[];
    jobs: Job[] = [];
    whatever: string;


  constructor(private requestService: RequestService, private jobService: JobsService) { }

  ngOnInit() {
      this.requestService.getRequests().subscribe(jbs => {
          this.applications = jbs;
          console.log(this.applications);
          for (let entry of this.applications) {
              console.log(entry.job);
              this.jobService.getJobById(entry.job).subscribe(jb => {
                  console.log(jb.description);
                  this.jobs.push(jb);
                  console.log("----",this.jobs)
              });// 1, "string", false
          }
      });
      console.log("---",this.jobs);

  }



}
