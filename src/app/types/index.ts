/**
 * Copyright (C) 2023 - All Rights Reserved
 *
 * Description:
 * Provides common types that are used across the platform.
 */

export interface UserServiceEvents {
  isFetchingUsers: boolean;
  isFetchingUserData: Record<number, boolean>;
}

export enum SnackbarTypes {
  Info = 'Info',
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error',
}

export interface SnackbarResource {
  message: string;
  type: SnackbarTypes;
}

export interface UserSupport {
  url: string;
  text: string;
}

export interface UserListing {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface User extends UserListing {
  support?: UserSupport;
}

export interface GetUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserListing[];
}

export interface UserListing {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface GetUserDataResponse {
  data: User;
  support: UserSupport;
}
