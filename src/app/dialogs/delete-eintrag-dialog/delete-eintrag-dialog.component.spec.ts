import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEintragDialogComponent } from './delete-eintrag-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FirebaseService} from '../../util/firebase.service';

class MockFirebaseService {}

describe('DeleteEintragDialogComponent', () => {
  let component: DeleteEintragDialogComponent;
  let fixture: ComponentFixture<DeleteEintragDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEintragDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: FirebaseService, useClass: MockFirebaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteEintragDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
