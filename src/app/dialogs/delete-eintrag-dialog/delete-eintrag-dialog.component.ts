import { Component, Inject, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { SnackbarService } from '../../util/snackbar.service';
import { Eintrag } from '../../models/eintrag';
import {FirebaseService} from '../../util/firebase.service';

@Component({
  selector: 'app-delete-eintrag-dialog',
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogTitle,
  ],
  templateUrl: './delete-eintrag-dialog.component.html',
  standalone: true,
  styleUrl: './delete-eintrag-dialog.component.scss'
})
export class DeleteEintragDialogComponent {
  protected eintrag = signal<Eintrag>({ title: '', username: '', password: '', uuid: '' });
  private snackbarService = inject(SnackbarService);
  private firebaseService = inject(FirebaseService);

  constructor(public dialog: MatDialogRef<DeleteEintragDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Eintrag) {
    this.eintrag.set(this.data);
  }

  protected closeDialog(): void {
    this.dialog.close();
  }

  protected deleteEintrag(): void {
    this.firebaseService.deleteEintrag(this.eintrag())
    console.log(`eintrag mit id ${this.eintrag().uuid} wurde gelöscht`);
    this.snackbarService.openSnackbar('Eintrag wurde erfolgreich gelöscht', 'Schliessen', 3000);
    this.dialog.close();
  }
}
