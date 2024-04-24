import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetUserDataResponse, GetUsersResponse, SnackbarTypes, User } from '../types';
import { SnackbarService } from './snackbar.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
    private _totalPages?: number;
    readonly currentPage = signal<number>(1);
    readonly searchTerm = signal<string>('');
    readonly users = signal<Record<number, User[]>>({});

    // Subject for user details. Using BehaviorSubject to hold the current value.
    readonly userDetailsSubject = new BehaviorSubject<User | null>(null);

    // Tracks fetching status to prevent concurrent requests for the same data.
    private _isFetchingUsers = false;
    isFetchingUserData = new Set<number>();

    constructor(
        private _http: HttpClient,
        private _snackbar: SnackbarService,
    ) {}

    /**
     * Handles the request to fetch the users from the API.
     *
     * @param pageNumber Page number identification.
     */
    async getUsers(pageNumber: number = this.currentPage()) {
        // We ensure we avoid sending multiple requests to get users.
        if (this._isFetchingUsers || this.users()[pageNumber] != null) {
            this.currentPage.set(pageNumber);
            return;
        }

        this._isFetchingUsers = true;

        try {
            const response = await firstValueFrom(
                this._http.get<GetUsersResponse>(`${environment.apiUrl}/users?page=${pageNumber ?? 1}`),
            );

            // Update the user records.
            const users = this.users();
            users[response.page] = response.data;

            this.users.set(users);

            // Update the current page and number of total pages.
            this.currentPage.set(pageNumber ?? response.page);
            this._totalPages = response.total_pages;
        } catch (error) {
            this._snackbar.showSnackBarNotification(
                `Couldn't retrieve the dashboard users. Please try again.`,
                SnackbarTypes.Error,
            );
        } finally {
            this._isFetchingUsers = false;
        }
    }

    /**
     * Handles the request to fetch user data.
     *
     * @param userId User identification.
     */
    async getUserDetails(userId: number) {
        if (this.isFetchingUserData.has(userId)) {
            return;
        }

        const cachedUser = this._findUserInCache(userId);
        if (cachedUser && cachedUser.support != null) {
            this.userDetailsSubject.next(cachedUser);
            return;
        }

        this.isFetchingUserData.add(userId);
        try {
            const response = await firstValueFrom(
                this._http.get<GetUserDataResponse>(`${environment.apiUrl}/users/${userId}`),
            );
            const userData: User = {
                ...response.data,
                support: response.support,
            };

            // If the user exists on our state, we update the user record.
            this._updateUserInCache(userId, userData);

            // Notify subscribers about the changes.
            this.userDetailsSubject.next(userData);
        } catch (error) {
            this._snackbar.showSnackBarNotification(
                `Couldn't retrieve details for user ID ${userId}.`,
                SnackbarTypes.Error,
            );
        } finally {
            this.isFetchingUserData.delete(userId);
        }
    }

    get totalPages() {
        return this._totalPages ?? 0;
    }

    get isFetchingUsers() {
        return this._isFetchingUsers;
    }

    /**
     * Finds the user data from the state cache.
     *
     * @param userId User identification
     * @returns User data
     */
    private _findUserInCache(userId: number) {
        const users = this.users();
        for (const page of Object.values(users)) {
            const foundUser = page.find((user) => user.id === userId);

            if (foundUser) {
                return foundUser;
            }
        }

        return;
    }

    /**
     * Updates the user on our state when the data changes.
     *
     * @param userId  User identification
     * @param data User updated data.
     */
    private _updateUserInCache(userId: number, data: User) {
        const users = this.users();
        for (const page of Object.values(users)) {
            const idx = page.findIndex((user) => user.id === userId);
            if (idx !== -1) {
                page[idx] = { ...page[idx], ...data };
                this.users.set(users);
                break;
            }
        }
    }
}
