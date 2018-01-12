import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../auth/_services/request.service";
import {Request} from "../../../auth/_models/request";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidates.component.html',
  styles: []
})
export class CandidatesComponent implements OnInit {

  applications: Request[];

  constructor(private requestService: RequestService) {

  }

  ngOnInit() {
    this.requestService.getUserRequests().subscribe(jbs => {
      this.applications = jbs;
      console.log(this.applications);
    });
  }

  accept(app: Request){
    if(app.status == "PENDING") {
      console.log(app.id);
      this.requestService.acceptRequest(app.id).subscribe( req => {
        console.log(req);
        this.requestService.getUserRequests().subscribe(jbs => {
          this.applications = jbs;
          console.log(this.applications);
        });
      })
    }
  }


  reject(app: Request){
    if(app.status == "PENDING") {
      console.log(app.id);
      this.requestService.rejectRequest(app.id).subscribe( req => {
        console.log(req);
        this.requestService.getUserRequests().subscribe(jbs => {
          this.applications = jbs;
          console.log(this.applications);
        });
      })
    }
  }

}
