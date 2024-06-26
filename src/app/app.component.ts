import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'angular-dynamic-user-dashboard';

    constructor(private _users: UserService) {}

    ngOnInit(): void {
        this._users.getUsers();
        this._users.getUserDetails(10);
    }
}
