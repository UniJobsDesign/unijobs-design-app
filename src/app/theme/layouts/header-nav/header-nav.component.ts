import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { User } from "../../../auth/_models/user";
import { UserService } from "../../../auth/_services/user.service";
import { Observable } from "rxjs/Observable";
import { OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    public static notifications: String[]=[];
    user: User;
    private url = 'http://localhost:8081';
    public static socket;

    constructor(private userService: UserService) {

    }

    get staticNotifications() {
        return HeaderNavComponent.notifications;
    }

    ngOnInit() {
        HeaderNavComponent.socket = io(this.url);

        var userId = localStorage.getItem("userId");
        console.log("userID - ngOnInit", userId);
        /*
        this.userService.getById(+userId).subscribe(user => {
            this.user = user;
            console.log(this.user);
        });
        */
        this.sendMessage(userId);
        this.user = JSON.parse(localStorage.getItem('user'));
        this.getMessages().subscribe(data => {
            console.log(data);
        });
    }

    ngOnDestroy() {
        HeaderNavComponent.socket.disconnect();
    }

    ngAfterViewInit() {

        mLayout.initHeader();

    }

    sendMessage(message) {
        HeaderNavComponent.socket.emit("userId", message);
    }

    getMessages() {
        let observable = new Observable(observer => {
            HeaderNavComponent.socket.on('message', (data) => {
                console.log(data);
                HeaderNavComponent.notifications.push(data);
                observer.next(data);
            });
            return () => {
                HeaderNavComponent.socket.disconnect();
            };
        });
        return observable;
    }

    dismiss(notification) {
        const index: number = HeaderNavComponent.notifications.indexOf(notification);
        if (index !== -1) {
            HeaderNavComponent.notifications.splice(index, 1);
        }
    }
}