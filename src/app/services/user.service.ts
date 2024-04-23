import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GetUserDataResponse,
  GetUsersResponse,
  SnackbarTypes,
  User,
} from '../types';
import { SnackbarService } from './snackbar.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  private _totalPages?: number;
  readonly users = signal<Record<number, User[]>>({});

  // Subject for user details. Using BehaviorSubject to hold the current value.
  readonly userDetailsSubject = new BehaviorSubject<User | null>(null);

  // Tracks fetching status to prevent concurrent requests for the same data.
  private isFetchingUsers = false;
  private isFetchingUserData = new Set<number>();

  constructor(
    private _http: HttpClient,
    private _snackbar: SnackbarService,
  ) {}

  async getUsers() {
    if (this.isFetchingUsers) {
      return;
    }
    this.isFetchingUsers = true;

    try {
      const response = await firstValueFrom(
        this._http.get<GetUsersResponse>(`${environment.apiUrl}/users?page=1`),
      );
      const users = this.users();
      users[response.page] = response.data;

      this.users.set(users);

      this._totalPages = response.total_pages;
    } catch (error) {
      this._snackbar.showSnackBarNotification(
        `Couldn't retrieve the dashboard users. Please try again.`,
        SnackbarTypes.Error,
      );
    } finally {
      this.isFetchingUsers = false;
    }
  }

  async getUserDetails(userId: number) {
    if (this.isFetchingUserData.has(userId)) {
      return;
    }

    const cachedUser = this._findUserInCache(userId);
    if (cachedUser) {
      this.userDetailsSubject.next(cachedUser);
      return;
    }

    this.isFetchingUserData.add(userId);
    try {
      const response = await firstValueFrom(
        this._http.get<GetUserDataResponse>(
          `${environment.apiUrl}/user/${userId}`,
        ),
      );
      this._updateUserInCache(userId, response.data);
      this.userDetailsSubject.next(response.data);
    } catch (error) {
      this._snackbar.showSnackBarNotification(
        `Couldn't retrieve details for user ID ${userId}.`,
        SnackbarTypes.Error,
      );
    } finally {
      this.isFetchingUserData.delete(userId);
    }
  }

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
