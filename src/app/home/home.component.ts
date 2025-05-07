import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { Eintrag } from '../models/eintrag';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EditEintragDialogComponent } from '../dialogs/edit-eintrag-dialog/edit-eintrag-dialog.component';
import { SnackbarService } from '../util/snackbar.service';
import { CreateEintragDialogComponent } from '../dialogs/create-eintrag-dialog/create-eintrag-dialog.component';
import { DeleteEintragDialogComponent } from '../dialogs/delete-eintrag-dialog/delete-eintrag-dialog.component';
import {FirebaseService} from '../util/firebase.service';
import {CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';
import {ErrorMessageComponent} from '../error-message/error-message.component';
import {WarningMessageComponent} from '../warning-message/warning-message.component';

@Component({
  selector: 'app-home',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatFormField,
    MatIcon,
    FormsModule,
    MatLabel,
    MatInput,
    MatButton,
    MatTooltip,
    CommonModule,
    ErrorMessageComponent,
    WarningMessageComponent,
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'username', 'password'];
  protected searchTerm = signal<string>('');
  protected eintraege = signal<Eintrag[]>([]);
  protected numberOfEintraege = computed(() => this.eintraege().length);
  protected hasEntries = signal<boolean>(true);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private firebaseService = inject(FirebaseService);
  private subscription!: Subscription;

  async ngOnInit(): Promise<void> {
    this.subscription = this.firebaseService.getEintraege().subscribe({
      next: (response) => {
        this.eintraege.set(response);
        if (this.eintraege().length === 0) {
          this.hasEntries.set(false);
        }
      },
      error: () => {
        this.snackbarService.openSnackbar('Ein Fehler ist aufgetreten! Deine Einträge konnten nicht geladen werden', 'Schliessen', 3000);
      }})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected filterEintraege(): Eintrag[] {
    if (!this.searchTerm() || this.searchTerm().length === 0) {
      return this.eintraege();
    }

    return this.eintraege().filter(eintrag =>
      eintrag.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      eintrag.username.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  }

  protected async copyPasswordToClipBoard(password: string): Promise<void> {
    await navigator.clipboard.writeText(password);
    this.snackbarService.openSnackbar('Passwort wurde kopiert', 'Schliessen', 3000);
  }

  protected logout(): void {
    this.firebaseService.signOut().then(()=>{
      this.router.navigate(['/login'])
    }).catch((error) => {
      console.log('signout Error: ' + error);
      this.snackbarService.openSnackbar('Es gab ein Fehler beim Ausloggen', 'Schliessen', 3000);
      this.router.navigate(['/login'])
    })
  }

  togglePasswordVisibility(eintrag: any) { // eslint-disable-line
    eintrag.showPassword = !eintrag.showPassword;
  }

  protected openEditEintragDialog(eintrag: Eintrag): void {
    this.dialog.open(EditEintragDialogComponent, {
      width: '500px',
      data: eintrag
    });
  }

  protected openCreateEintragDialog(): void {
    this.dialog.open(CreateEintragDialogComponent, {
      width: '500px'
    });
  }

  protected openDeleteEintragDialog(eintrag: Eintrag): void {
    this.dialog.open(DeleteEintragDialogComponent, {
      width: '500px',
      data: eintrag
    });
  }
}
