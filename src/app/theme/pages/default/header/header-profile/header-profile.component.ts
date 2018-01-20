import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Helpers} from '../../../../../helpers';
import {User} from "../../../../../auth/_models/user";
import {UserService} from "../../../../../auth/_services/user.service";
import {Job} from "../../../../../auth/_models/job";
import {JobsService} from "../../../../../auth/_services/jobs.service";
import {Skill} from "../../../../../auth/_models/skill";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./header-profile.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderProfileComponent implements OnInit {

    user: User = new User();
    dateOfBirth: string = "";
    jobs: Job[] = [];
    pageNo = 1;
    skills: Skill[];
    selected_skills: number[] = [];



    constructor(private userService: UserService, private jobService: JobsService) {
    }

    ngOnInit() {
        this.jobService.jobFilterByUniUser(this.pageNo - 1).subscribe(jbs => {
            this.jobs = jbs;
            console.log(this.jobs);
        });

        this.jobService.getAllSkills().subscribe(skills => {
            this.skills = skills;
            console.log(this.skills);
        });

        this.loadUserDetails();

        /*
         this.userService.getById(+userId).subscribe(user => {

         this.user = user;
         console.log(this.user);
         });
         */
    }

    isSkillSelected(skill): boolean{
        return this.selected_skills.includes(skill.id);
    }

    selectSkill(skill) {
        this.selected_skills.push(skill.id);
        console.log(this.selected_skills, this.skills);
    }


    removeSkill(skill) {
        const index = this.selected_skills.indexOf(skill.id);
        this.selected_skills.splice(index, 1);
    }

    loadUserDetails() {
        //var userId = localStorage.getItem("userId");
        //console.log("userID", userId);
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log("userrrrrr", this.user);
        if(this.user.dob)
            this.dateOfBirth = this.user.dob.substring(0, 10);
        console.log("USer DOB:", this.dateOfBirth);
        this.selected_skills = this.user.skills;
        console.log("plmmmm", this.selected_skills);

    }


    updateUser(dob, phone) {
        console.log("DOB===", dob.value);
        console.log("PHOME===", phone.value);
        if(dob.value === null){
            this.user.dob = dob.value;
            console.log("PE IFFFFF")
        }
        else {
            console.log("PE ELSEEE");
            this.user.dob = "2018-01-10";
        }

        console.log("update User dob", this.user.dob);
        if(phone.value === null)
            this.user.phone = phone.value;
        else
            this.user.phone = "0000000000";
        // console.log("update user phone", this.user.phone);
        this.userService.update(this.user).subscribe(user2 => {
                console.log(user2);
                localStorage.setItem('user', JSON.stringify(user2));
                this.loadUserDetails();
            }
        );


    }

    next() {
        this.jobService.jobFilterByUniUser(this.pageNo).subscribe(jbs => {
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
        if (this.pageNo > 1) {
            this.jobService.jobFilterByUniUser(this.pageNo - 2).subscribe(jbs => {
                if (jbs.length !== 0) {
                    this.jobs = jbs;
                    console.log(this.jobs);
                    this.pageNo--;
                }
            })
        }
        else {
            console.log("first page");
        }
    }
}