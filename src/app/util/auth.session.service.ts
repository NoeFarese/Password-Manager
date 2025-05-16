// auth-session.service.ts
import {inject, Injectable} from '@angular/core';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {FirebaseService} from './firebase.service';
import {SnackbarService} from './snackbar.service';

@Injectable({providedIn: 'root'})
export class AuthSessionService {
  private readonly idle = inject(Idle);
  private readonly afAuth = inject(AngularFireAuth);
  private readonly firebaseService = inject(FirebaseService);
  private readonly router = inject(Router)
  private readonly snackbarService = inject(SnackbarService)

  init() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.startIdleWatch();
      } else {
        this.idle.stop();
      }
    });
  }

  private startIdleWatch() {
    this.idle.setIdle(240);
    this.idle.setTimeout(60);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onIdleStart.subscribe(() => this.snackbarService
      .openSnackbar("Du bisst seit 4 Minuten Inaktiv: In einer Minute wirst du automatisch ausgeloggt", "okay", 60000));
    this.idle.onTimeout.subscribe(() => {
      console.warn('User has been idle too long. Logging out.');
      this.firebaseService.signOut();
      this.router.navigate(['/login']);
    });

    this.idle.watch();
  }
}
