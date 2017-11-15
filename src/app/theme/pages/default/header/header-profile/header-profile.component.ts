import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import {User} from "../../../../../auth/_models/user";
import {UserService} from "../../../../../auth/_services/user.service";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./header-profile.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderProfileComponent implements OnInit {

    user: User;

    constructor(private userService: UserService) {

    }
    ngOnInit() {
        var userId = localStorage.getItem("userId");
        console.log("userID", userId);
        this.userService.getById(+userId).subscribe(user => {
            this.user = user;
            console.log(this.user);
        });
    }

}