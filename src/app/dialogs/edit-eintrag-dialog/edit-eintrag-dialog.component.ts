import {Component, computed, Inject, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Eintrag } from '../../models/eintrag';
import { SnackbarService } from '../../util/snackbar.service';
import {FirebaseService} from '../../util/firebase.service';
import {getPasswordStrength} from '../../util/password-strength.util';

@Component({
  selector: 'app-edit-eintrag-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './edit-eintrag-dialog.component.html',
  standalone: true,
  styleUrl: './edit-eintrag-dialog.component.scss'
})
export class EditEintragDialogComponent {
  protected title = signal<string>('');
  protected username = signal<string>('');
  protected password = signal<string>('');
  protected uuid = signal<string>('');
  protected passwordStrength = computed(() => getPasswordStrength(this.password()));

  private firebaseService = inject(FirebaseService);
  private snackbarService = inject(SnackbarService);

  constructor(public dialog: MatDialogRef<EditEintragDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Eintrag) {
    console.log(data)
    this.title.set(this.data.title);
    this.username.set(this.data.username);
    this.password.set(this.data.password);
    this.uuid.set(this.data.uuid);
  }

  updateEintrag(): void {
    if (this.title().trim() !== '' && this.username().trim() !== '' && this.password().trim() !== '') {
      const eintrag: Eintrag = {
        uuid: this.uuid(),
        title: this.title(),
        username: this.username(),
        password: this.password()
      }

      this.snackbarService.openSnackbar('Eintrag wurde erfolgreich aktualisiert', 'Schliessen', 3000);
      this.dialog.close();

      this.firebaseService.upsertEintrag(eintrag);
    } else {
      this.snackbarService.openSnackbar('Fülle bitte alle Felder aus', 'Schliessen', 3000);
    }
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
