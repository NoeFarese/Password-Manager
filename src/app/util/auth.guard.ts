import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SnackbarService} from './snackbar.service';
import {FirebaseService} from './firebase.service';
import {map, Observable, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private firebaseService = inject(FirebaseService);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);

  canActivate(): Observable<boolean> {
    return this.firebaseService.isAuthenticated().pipe(
      take(1),
      map(isAuth => {
        if (isAuth) {
          return true;
        } else {
          this.snackbarService.openSnackbar('Du bist nicht eingeloggt', 'Schliessen', 3000);
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
