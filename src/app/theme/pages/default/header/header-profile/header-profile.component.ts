import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import {User} from "../../../../../auth/_models/user";
import {UserService} from "../../../../../auth/_services/user.service";
import {Job} from "../../../../../auth/_models/job";
import {JobsService} from "../../../../../auth/_services/jobs.service";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./header-profile.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderProfileComponent implements OnInit {

    user: User;
    dateOfBirth: string;
    jobs: Job[];


    constructor(private userService: UserService, private jobService: JobsService) {

    }
    ngOnInit() {
        this.jobService.jobFilterByUniUser().subscribe(jbs => {
            this.jobs = jbs;
            console.log(this.jobs);
        });
        this.loadUserDetails();

        /*
         this.userService.getById(+userId).subscribe(user => {

         this.user = user;
         console.log(this.user);
         });
        */
    }

    loadUserDetails(){
        //var userId = localStorage.getItem("userId");
        //console.log("userID", userId);
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log("userrrrrr", this.user);
        this.dateOfBirth = this.user.dob.substring(0,10);
        console.log("USer DOB:", this.dateOfBirth);
    }

    updateUser(dob,phone){
        this.user.dob = dob.value;
        console.log("update User dob",this.user.dob);
        this.user.phone = phone.value;
        console.log("update user phone",this.user.phone);
        this.userService.update(this.user).subscribe(user2 =>{
            console.log(user2);
            localStorage.setItem('user', JSON.stringify(user2));
                this.loadUserDetails();
        }
            );


    }

}