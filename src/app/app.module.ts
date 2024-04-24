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
import { UserTableComponent } from './pages/users/user-table/user-table.component';
import { ChevronIconComponent } from './icons/chevron-icon/chevron-icon.component';
import { ArrowBackComponent } from './icons/arrow-back/arrow-back.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CloseIconComponent } from './icons/close-icon/close-icon.component';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        UserDetailsComponent,
        UserTableComponent,
        ChevronIconComponent,
        ArrowBackComponent,
        CloseIconComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        SharedModule,
    ],
    providers: [UserService, SnackbarService],
    bootstrap: [AppComponent],
})
export class AppModule {}
