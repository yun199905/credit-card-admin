import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  #snackBar = inject(MatSnackBar);

  showMsg(msg: string) {
    this.#snackBar.open( msg, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    })
  }
}
