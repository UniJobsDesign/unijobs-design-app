import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import {User} from "../../../auth/_models/user";
import {UserService} from "../../../auth/_services/user.service";

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

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
    ngAfterViewInit() {

        mLayout.initHeader();

    }

}