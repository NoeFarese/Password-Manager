import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FirebaseService} from '../util/firebase.service';
import {SnackbarService} from '../util/snackbar.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon
  ],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private firebaseService = inject(FirebaseService);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);
  protected email = signal<string>('');
  protected password = signal<string>('');
  protected name = signal<string>('');
  protected password_confirm = signal<string>('');
  protected showPassword = signal<boolean>(false);

  protected signup(): void {
    if(this.password() != this.password_confirm()){
      this.snackbarService.openSnackbar('Die Passwörter stimmen nicht überein', 'Schliessen', 3000)
      return
    }
    this.firebaseService.signup(this.email(), this.password()).then(() => {
      this.router.navigate(['/home']);
      console.log('Account erstellt');
    }).catch((error) => {
      this.snackbarService.openSnackbar('Etwas ist schief gelaufen! Versuche es erneut', 'Schliessen', 3000)
      console.log('Error firebase Authentication' + error);
    })
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }
}
