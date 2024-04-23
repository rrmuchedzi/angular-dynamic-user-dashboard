import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [SnackbarComponent, NavigationComponent],
  imports: [CommonModule],
  exports: [SnackbarComponent, NavigationComponent],
})
export class SharedModule {}
