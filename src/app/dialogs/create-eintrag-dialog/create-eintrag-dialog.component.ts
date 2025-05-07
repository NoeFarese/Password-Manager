import {Component, computed, inject, signal} from '@angular/core';
import {SnackbarService} from '../../util/snackbar.service';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {Eintrag} from '../../models/eintrag';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FirebaseService} from '../../util/firebase.service';
import { v4 as uuidv4 } from 'uuid';
import {getPasswordStrength} from '../../util/password-strength.util';

@Component({
  selector: 'app-create-eintrag-dialog',
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './create-eintrag-dialog.component.html',
  standalone: true,
  styleUrl: './create-eintrag-dialog.component.scss'
})
export class CreateEintragDialogComponent {
  protected title = signal<string>('');
  protected username = signal<string>('');
  protected password = signal<string>('');
  protected passwordStrength = computed(() => getPasswordStrength(this.password()));

  private snackbarService = inject(SnackbarService);
  private firebaseService = inject(FirebaseService);

  constructor(public dialog: MatDialogRef<CreateEintragDialogComponent>) {
  }

  saveEintrag(): void {
    if (this.title().trim() !== '' && this.username().trim() !== '' && this.password().trim() !== '') {
      const eintrag: Eintrag = {
        title: this.title(),
        username: this.username(),
        password: this.password(),
        uuid: uuidv4()
      }

      this.firebaseService.upsertEintrag(eintrag).then(() => {
        this.snackbarService.openSnackbar('Eintrag wurde erfolgreich gespeichert', 'Schliessen', 3000);
        this.dialog.close();
      }).catch((err) => {
        console.error('Error', err);
        this.snackbarService.openSnackbar('Ein Fehler ist aufgetreten! Dein Eintrag konnte nicht gespeichert werden!', 'Schliessen', 3000);
      })

    } else {
      this.snackbarService.openSnackbar('Fülle bitte alle Felder aus', 'Schliessen', 3000);
    }
  }

  generateRandomPassword(): void {
    const password: string = Math.random().toString(36).slice(-10);
    this.password.set(password);
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
