///<reference path="../../../../../auth/_models/job.ts"/>
import {Component, OnInit, ViewEncapsulation, AfterViewInit, ComponentFactoryResolver} from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {JobsService} from "../../../../../auth/_services/jobs.service";
import {Job} from "../../../../../auth/_models/job";
import { Router} from "@angular/router";
import {AlertService} from "../../../../../auth/_services/alert.service";
import {AlertComponent} from "../../../../../auth/_directives/alert.component";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./header-actions.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderActionsComponent implements OnInit, AfterViewInit {

    constructor(private _script: ScriptLoaderService,
                private jobService: JobsService,
                private _router: Router,
                private _alertService: AlertService,
                private cfr: ComponentFactoryResolver) {}

    ngOnInit() {

    }
    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/demo/default/custom/header/actions.js');

    }

    addJob(cost,location,hpw,startDate,endDate){



        var description = document.getElementsByClassName('note-editable')[0];

        console.log("LOCATION:",location.value);
        console.log("HPW:",hpw.value);
        console.log("COST:",cost.value);
        console.log("DESCRIPTION:",description.innerHTML.toString());

        var userId = JSON.parse(localStorage.getItem('userId'));


        var job1 : Job =  <Job>
            {
                id: null,
                description: description.innerHTML.toString(),
                hpw: hpw.value,
                cost: cost.value,
                uniUserId: userId,
                location: location.value,
                startDate: startDate.value,
                endDate: endDate.value,
                skills: [],
            };

        console.log("job1111111",job1);

        this.jobService.addJob(job1).subscribe(
            data => {
                this._router.navigateByUrl('/index');
            },
            error =>  {
                console.log("!!!!!!!");
                this.showAlert('alertJob');
                this._alertService.error("Invalid login credentials")
            });

        //this.job = new Job(1,description,hpw,cost,1,location,startDate,endDate);

        //console.log("USERID",userId);
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}