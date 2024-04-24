import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    private _userSubscription!: Subscription;
    user!: User;

    userIdentification!: number;

    constructor(
        private _route: ActivatedRoute,
        private _userService: UserService,
    ) {}

    ngOnInit(): void {
        this._userSubscription = this._userService.userDetailsSubject.subscribe((user) => {
            if (user == null) {
                return;
            }
            this.user = user;
        });

        // Get the user identification from the params.
        this.userIdentification = this._route.snapshot.params['id'];

        if (this.userIdentification != null) {
            // Get the user profile details.
            this._userService.getUserDetails(this.userIdentification);
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe from the user subject.
        if (this._userSubscription) {
            this._userSubscription.unsubscribe();
        }
    }

    get isFetchingUserData() {
        return this._userService.isFetchingUserData.has(this.userIdentification);
    }
}
