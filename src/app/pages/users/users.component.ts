import { Component, OnInit, computed } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  currentPageNumber = 1;

  users$ = computed(() => this._usersService.users()[this.currentPageNumber]);
  
  constructor(private _usersService: UserService) {}

  ngOnInit(): void {
    this._usersService.getUsers();
  }
}
