///<reference path="../../../../../auth/_models/job.ts"/>
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { JobsService } from "../../../../../auth/_services/jobs.service";
import { Job } from "../../../../../auth/_models/job";
import { Router } from "@angular/router";
import { AlertService } from "../../../../../auth/_services/alert.service";
import { AlertComponent } from "../../../../../auth/_directives/alert.component";
import { Skill } from "../../../../../auth/_models/skill";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./header-actions.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderActionsComponent implements OnInit, AfterViewInit {
    skills: Skill[] = [];
    selected_skills: Skill[] = [];
    addJobError: boolean;
    addJobSuccess: boolean;
    addJobProcessing: boolean;

    constructor(private _script: ScriptLoaderService,
        private jobService: JobsService,
        private _router: Router,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver) { }

    ngOnInit() {
        this.jobService.getAllSkills().subscribe(skills => {
            this.skills = skills;
            console.log(this.skills);
        })
    }


    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/demo/default/custom/header/actions.js');
    }

    isSkillSelected(skill): boolean {
        return this.selected_skills.includes(skill);
    }

    selectSkill(skill) {
        this.selected_skills.push(skill);
    }

    removeSkill(skill) {
        const index = this.selected_skills.indexOf(skill);
        this.selected_skills.splice(index, 1);
    }

    addJob(cost, location, hpw, startDate, endDate) {
        this.addJobProcessing = true;
        var description = document.getElementsByClassName('note-editable')[0];

        console.log("LOCATION:", location.value);
        console.log("HPW:", hpw.value);
        console.log("COST:", cost.value);
        console.log("DESCRIPTION:", description.innerHTML.toString());

        var userId = JSON.parse(localStorage.getItem('userId'));


        var job1: Job = <Job>
            {
                id: null,
                description: description.innerHTML.toString(),
                hpw: hpw.value,
                cost: cost.value,
                uniUserId: userId,
                location: location.value,
                startDate: startDate.value,
                endDate: endDate.value,
                skillIds: this.selected_skills.map(skill => skill.id)
            };

        console.log("job1111111", job1);

        this.jobService.addJob(job1).subscribe(
            data => {
                this.addJobProcessing = null;
                this.addJobSuccess = true;
                setTimeout(() => this.addJobSuccess = null, 3000);
                setTimeout(() => this._router.navigateByUrl('/index'), 3000);
            },
            error => {
                this.addJobProcessing = null;
                this.addJobError = true;
                setTimeout(() => this.addJobError = null, 3000);
            });
    }

    cancel() {
        setTimeout(() => this._router.navigateByUrl('/index'), 500);
    }

    //this.job = new Job(1,description,hpw,cost,1,location,startDate,endDate);

    //console.log("USERID",userId);

}