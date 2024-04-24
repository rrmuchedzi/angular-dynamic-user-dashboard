import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    users$ = computed(() => this._usersService.users()[this._usersService.currentPage()]);

    constructor(private _usersService: UserService) {}

    ngOnInit(): void {
        this._usersService.getUsers();
    }

    handlePageChangeEvent(pageNumber: number) {
        this._usersService.getUsers(pageNumber);
    }

    get currentPage() {
        return this._usersService.currentPage();
    }

    get totalPages() {
        return this._usersService.totalPages;
    }

    get isFetchingUsers() {
        return this._usersService.isFetchingUsers;
    }
}
