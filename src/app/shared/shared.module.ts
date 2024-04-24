import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [SnackbarComponent, NavigationComponent, LoaderComponent],
    imports: [CommonModule],
    exports: [SnackbarComponent, NavigationComponent, LoaderComponent],
})
export class SharedModule {}
