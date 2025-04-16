import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  openSnackbar(message: string, action: string, duration: number, verticalPosition: 'top' | 'bottom' = 'top'): void {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition,
    });
  }
}
