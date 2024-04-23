import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';
import { SnackbarService } from './services/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SharedModule } from './shared/shared.module';
import { UserTableRowComponent } from './pages/users/user-table-row/user-table-row.component';

@NgModule({
  declarations: [AppComponent, UsersComponent, UserDetailsComponent, UserTableRowComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    SharedModule,
  ],
  providers: [UserService, SnackbarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
