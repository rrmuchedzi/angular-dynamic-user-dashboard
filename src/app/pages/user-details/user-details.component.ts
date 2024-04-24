import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    private _userSubscription!: Subscription;
    user!: User;

    constructor(
        private _route: ActivatedRoute,
        private _userService: UserService,
    ) {}

    ngOnInit(): void {
        this._userSubscription = this._userService.userDetailsSubject.subscribe((user) => {
            console.log('Got a sniff: ', user);
            if (user == null) {
                return;
            }
            this.user = user;
        });

        // Get the user identification from the params.
        const userIdentification = this._route.snapshot.params['id'];

        if (userIdentification != null) {
            // Get the user profile details.
            this._userService.getUserDetails(parseInt(userIdentification, 10));
        }
    }

    ngOnDestroy(): void {
        if (this._userSubscription) {
            this._userSubscription.unsubscribe();
        }
    }
}
