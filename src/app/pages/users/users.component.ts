import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
    // Compute the platform users.
    users$ = computed(() => {
        const searchTerm = this._usersService.searchTerm();
        const currentPage = this._usersService.currentPage();

        return searchTerm.length > 0
            ? Object.values(this._usersService.users())
                  .flat()
                  .filter(({ id }) => id.toString() === searchTerm)
            : this._usersService.users()[currentPage];
    });

    // Search form control initialization.
    readonly searchFormControl = new FormControl('');
    private _searchFormSubscription!: Subscription;

    constructor(private _usersService: UserService) {}

    ngOnInit(): void {
        this._usersService.getUsers();

        // Subscribe to the search form control for changes.
        this._searchFormSubscription = this.searchFormControl.valueChanges
            .pipe(debounceTime(250), distinctUntilChanged())
            .subscribe((searchQuery) => {
                this._usersService.searchTerm.set((searchQuery ?? '').trim());
            });
    }

    ngOnDestroy(): void {
        this._usersService.searchTerm.set('');

        if (this._searchFormSubscription) {
            this._searchFormSubscription.unsubscribe();
        }
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
