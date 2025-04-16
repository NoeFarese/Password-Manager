import {Component, inject, signal} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FirebaseService} from '../util/firebase.service';
import {SnackbarService} from '../util/snackbar.service';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);
  private firebaseService = inject(FirebaseService);
  private snackbarService = inject(SnackbarService);
  protected email = signal<string>('');
  protected password = signal<string>('');
  protected showPassword = signal<boolean>(false);

  protected login(): void {
    this.firebaseService.login(this.email(), this.password()).then(() => {
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.snackbarService.openSnackbar('Email oder Passwort sind falsch', 'Schliessen', 3000)
      console.log('Error firebase Authentication' + error);
    })
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }
}
